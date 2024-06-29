package eease.backend.security.jwt

import eease.backend.service.EeaseUserDetails
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class JwtAuthenticationFilter(
    private val userDetailsService: UserDetailsService,
    private val jwt: JwtUtil,
) : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain,
    ) {
        val authHeader: String? = request.getHeader("Authorization")
        if (authHeader == null || authHeader.doesNotContainBearerToken()) {
            filterChain.doFilter(request, response)
            return
        }
        val jwtToken = authHeader.extractTokenValue()

        val email = jwt.extractEmail(jwtToken) ?: return

        if (SecurityContextHolder.getContext().authentication == null) {
            val foundUser = userDetailsService.loadUserByUsername(email) as EeaseUserDetails
            if (jwt.isValid(jwtToken, foundUser)) updateContext(foundUser, request)

            filterChain.doFilter(request, response)
        }
    }

    private fun String.doesNotContainBearerToken() = !this.startsWith("Bearer ")

    private fun String.extractTokenValue() = this.substringAfter("Bearer ")

    private fun updateContext(foundUser: EeaseUserDetails, request: HttpServletRequest) {
        val id = foundUser.id
        val authToken = UsernamePasswordAuthenticationToken(foundUser, id, foundUser.authorities)
        authToken.details = WebAuthenticationDetailsSource().buildDetails(request)
        SecurityContextHolder.getContext().authentication = authToken
    }
}