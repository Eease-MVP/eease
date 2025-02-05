package eease.backend.controller

import eease.backend.model.ErrorResponse
import eease.backend.security.PasswordValidator
import eease.backend.service.AuthenticationService
import eease.backend.security.RateLimiter
import jakarta.servlet.http.HttpServletRequest
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
class AuthorizeController(
    private val authenticationService: AuthenticationService,
    private val rateLimiter: RateLimiter
) {
    private val logger = LoggerFactory.getLogger(AuthorizeController::class.java)

    @PostMapping("/sign_up")
    fun signUp(
        @RequestBody signUpRequest: SignRequest,
        request: HttpServletRequest
    ): ResponseEntity<ErrorResponse> {
        val clientIp = request.remoteAddr
        
        if (!rateLimiter.checkRateLimit(clientIp)) {
            return ResponseEntity
                .status(HttpStatus.TOO_MANY_REQUESTS)
                .body(ErrorResponse(
                    status = HttpStatus.TOO_MANY_REQUESTS,
                    message = "Too many requests. Please try again later."
                ))
        }

        // Validate password
        if (!PasswordValidator.isValid(signUpRequest.password)) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse(
                    status = HttpStatus.BAD_REQUEST,
                    message = PasswordValidator.getValidationMessage()
                ))
        }

        return try {
            logger.info("Attempting to sign up user with email: ${signUpRequest.email}")
            authenticationService.signUp(
                email = signUpRequest.email,
                password = signUpRequest.password
            )
            ResponseEntity.ok().build()
        } catch (e: EmailAlreadyExistsException) {
            logger.warn("Sign up failed - email already exists: ${signUpRequest.email}")
            ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(ErrorResponse(
                    status = HttpStatus.CONFLICT,
                    message = "Email is already registered"
                ))
        }
    }

    @PostMapping("/sign_in")
    fun signIn(
        @RequestBody signInRequest: SignRequest,
        request: HttpServletRequest
    ): ResponseEntity<*> {
        val clientIp = request.remoteAddr

        if (!rateLimiter.checkRateLimit(clientIp)) {
            return ResponseEntity
                .status(HttpStatus.TOO_MANY_REQUESTS)
                .body(ErrorResponse(
                    status = HttpStatus.TOO_MANY_REQUESTS,
                    message = "Too many requests. Please try again later."
                ))
        }

        return try {
            logger.info("Attempting to sign in user with email: ${signInRequest.email}")
            val response = authenticationService.signIn(
                email = signInRequest.email,
                password = signInRequest.password
            )
            ResponseEntity.ok(response)
        } catch (e: Exception) {
            logger.warn("Sign in failed for email: ${signInRequest.email}")
            ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ErrorResponse(
                    status = HttpStatus.UNAUTHORIZED,
                    message = "Invalid credentials"
                ))
        }
    }
}

data class SignRequest(
    val email: String,
    val password: String
)

data class SignResponse(
    val accessToken: String,
)