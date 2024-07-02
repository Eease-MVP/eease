package eease.backend.service

import eease.backend.controller.EmailAlreadyExistsException
import eease.backend.controller.SignResponse
import eease.backend.model.UserCredentials
import eease.backend.model.UserCredentialsRepository
import eease.backend.security.jwt.JwtUtil
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.userdetails.UserDetailsService
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
    fun signIn(
        email: String,
        password: String,
    ): SignResponse = with(userDetailsService) {
        val auth = authManager.authenticate(
            UsernamePasswordAuthenticationToken.unauthenticated(
                /* principal = */ email,
                /* credentials = */ password
            )
        )
        println("Authentication is $auth")
        val userDetails = auth.principal as EeaseUserDetails
        val id = userDetails.id
        val accessToken = createAccessToken(id = id)
        return SignResponse(accessToken = accessToken)
    }


    fun signUp(
        email: String,
        password: String,
    ) = with(userDetailsService) {

        userCredentialsRepository
            .findUserCredentialsByEmailIgnoreCase(email = email)
            ?.let { throw EmailAlreadyExistsException(email = email) }

        val hashedPassword = passwordEncoder.encode(password)
        val userCredentials = UserCredentials(
            email = email,
            hashedPassword = hashedPassword,
        )
        userCredentialsRepository.save(userCredentials)
    }

    private fun createAccessToken(id: Long) = jwt.generate(id = id)
}