package eease.backend.controller

import eease.backend.model.UserCredentials
import eease.backend.model.UserRepository
import eease.backend.service.AuthenticationService
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class AuthorizeController(
    private val authenticationService: AuthenticationService,
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
) {

    @PostMapping("/auth")
    fun authenticate(
        @RequestBody user: AuthenticationRequest,
    ): AuthenticationResponse =
        userRepository.findUserCredentialsByEmailIgnoreCase(user.email)
            ?.let {
                authenticationService.authentication(user.copy(password = user.password + it.salt))
            } ?: throw BadCredentialsException("User with ${user.email} doesn't exist.")

    @PostMapping("/register")
    fun registerUser(@RequestBody user: AuthenticationRequest): ResponseEntity<String> {

        userRepository.findUserCredentialsByEmailIgnoreCase(user.email)
            ?.let {
                // if there's already a user with this email return error
                return ResponseEntity.badRequest().body("User with ${user.email} already exists.")
            }
        val email = user.email
        val salt = UserCredentials.generateSalt()
        val hashedPassword = passwordEncoder.encode(user.password + salt)
        userRepository.save(
            UserCredentials(
                email = email,
                password = hashedPassword,
                salt = salt
            )
        )
        return ResponseEntity.ok("User registered successfully.")
    }

    /*@PostMapping("/login")
    fun loginUser(@RequestBody userCredentials: UserCredentials): ResponseEntity<AuthenticationResponse> {
        val userDetails: UserDetails = userDetailsService.loadUserByUsername(userCredentials.email)
        val user = userRepository.findUserCredentialsByEmailIgnoreCase(email = userCredentials.email)
        println(userCredentials)
        println(user)
        println(passwordEncoder.encode(userCredentials.password))
        println("username: ${userDetails.username}, password: ${userDetails.password}")
        return if (user != null && passwordEncoder.matches(userCredentials.password, user.password)) {
            println("fuck eah")
            ResponseEntity.ok(authenticationService!!.authentication(AuthenticationRequest(userCredentials.email, userCredentials.password)))
        } else {
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        }
    }*/
}

data class AuthenticationRequest(
    val email: String,
    val password: String,
)

data class AuthenticationResponse(
    val accessToken: String,
)