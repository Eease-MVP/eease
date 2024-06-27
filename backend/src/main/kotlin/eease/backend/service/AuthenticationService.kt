package eease.backend.service

import eease.backend.model.UserCredentials
import eease.backend.model.UserCredentialsRepository
import eease.backend.security.jwt.JwtUtil
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthenticationService(
    private val authManager: AuthenticationManager,
    private val jwt: JwtUtil,
    private val userCredentialsRepository: UserCredentialsRepository,
    private val passwordEncoder: PasswordEncoder,
    private val userDetailsService: UserDetailsService,
) {
    fun authenticate(
        authenticationRequest: AuthenticationRequest,
    ): AuthenticationResponse = with(userDetailsService) {
        val userDetails: EeaseUserDetails
        try {
            userDetails = loadUserByUsername(authenticationRequest.email) as EeaseUserDetails
        } catch (e: UsernameNotFoundException) {
            throw BadCredentialsException("User with ${authenticationRequest.email} doesn't exist.")
        }

        val auth = authManager.authenticate(
            UsernamePasswordAuthenticationToken(
                authenticationRequest.email,
                authenticationRequest.password + userDetails.salt
            )
        )
        println("auth: $auth")

        val accessToken = createAccessToken(authenticationRequest.email)
        return AuthenticationResponse(accessToken = accessToken)
    }


    fun register(
        authenticationRequest: AuthenticationRequest,
    ): AuthenticationResponse = with(userDetailsService) {
        try {
            loadUserByUsername(authenticationRequest.email)
                ?.let { throw BadCredentialsException("User with ${authenticationRequest.email} already exists.") }
        } catch (e: UsernameNotFoundException) {
            println(e)
        }

        val email = authenticationRequest.email
        val salt = UserCredentials.generateSalt()
        val hashedPassword = passwordEncoder.encode(authenticationRequest.password + salt)

        val userCredentials = UserCredentials(email = email, hashedPassword = hashedPassword, salt = salt)
        userCredentialsRepository.save(userCredentials)

        val accessToken = createAccessToken(authenticationRequest.email)
        return AuthenticationResponse(accessToken = accessToken)
    }

    private fun createAccessToken(email: String) = jwt.generate(email = email)
}

data class AuthenticationRequest(
    val email: String,
    val password: String,
)

data class AuthenticationResponse(
    val accessToken: String,
)