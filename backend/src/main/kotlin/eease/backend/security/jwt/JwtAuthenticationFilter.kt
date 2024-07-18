package eease.backend.security.jwt

import eease.backend.service.EeaseUserDetails
import eease.backend.service.EeaseUserDetailsService
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class JwtAuthenticationFilter(
    private val userDetailsService: EeaseUserDetailsService,
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

        val id = jwt.extractId(jwtToken) ?: return

        if (SecurityContextHolder.getContext().authentication == null) {
            val foundUser = userDetailsService.loadUserById(id = id) as EeaseUserDetails
            if (jwt.isValid(jwtToken, foundUser)) updateContext(foundUser, request)

            filterChain.doFilter(request, response)
        }
    }

    private fun String.doesNotContainBearerToken() = !startsWith("Bearer ")

    private fun String.extractTokenValue() = substringAfter("Bearer ")

    private fun updateContext(foundUser: EeaseUserDetails, request: HttpServletRequest) {
        val authToken = UsernamePasswordAuthenticationToken.authenticated(
            /* principal = */ foundUser,
            /* credentials = */ null,
            /* authorities = */ foundUser.authorities
        )
        authToken.details = WebAuthenticationDetailsSource().buildDetails(request)
        SecurityContextHolder.getContext().authentication = authToken
    }
}