package eease.backend.service

import eease.backend.controller.AuthenticationRequest
import eease.backend.controller.AuthenticationResponse
import eease.backend.security.JwtProperties
import eease.backend.security.JwtUtil
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.stereotype.Service
import java.util.*

@Service
class AuthenticationService(
    private val authManager: AuthenticationManager,
    private val jwt: JwtUtil,
    private val jwtProperties: JwtProperties,
) {
    fun authentication(authenticationRequest: AuthenticationRequest): AuthenticationResponse {
        val auth = authManager.authenticate(
            UsernamePasswordAuthenticationToken(
                authenticationRequest.email,
                authenticationRequest.password
            )
        )
        println("auth: $auth")
        val accessToken = createAccessToken(authenticationRequest.email)
        return AuthenticationResponse(accessToken = accessToken)
    }

    private fun createAccessToken(email: String) = jwt.generate(
        email = email,
        expirationDate = getAccessTokenExpiration()
    )

    private fun getAccessTokenExpiration(): Date =
        Date(System.currentTimeMillis() + jwtProperties.accessTokenExpiration)
}