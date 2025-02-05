package eease.backend.controller

import eease.backend.model.ErrorResponse
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class ControllerAdvice {
    private val logger = LoggerFactory.getLogger(ControllerAdvice::class.java)

    @ExceptionHandler(EmailAlreadyExistsException::class)
    fun handleEmailExists(ex: EmailAlreadyExistsException) = ResponseEntity(
        ErrorResponse(
            status = HttpStatus.CONFLICT,
            message = "Email is already registered"
        ),
        HttpStatus.CONFLICT
    )

    @ExceptionHandler(BadCredentialsException::class)
    fun handleBadCredentials(ex: BadCredentialsException) = ResponseEntity(
        ErrorResponse(
            status = HttpStatus.UNAUTHORIZED,
            message = "Invalid credentials"
        ),
        HttpStatus.UNAUTHORIZED
    )

    @ExceptionHandler(Exception::class)
    fun handleGenericException(ex: Exception): ResponseEntity<ErrorResponse> {
        // Log the full error for debugging
        logger.error("Unexpected error", ex)
        
        // Return sanitized response to client
        return ResponseEntity(
            ErrorResponse(
                status = HttpStatus.INTERNAL_SERVER_ERROR,
                message = "An unexpected error occurred"
            ),
            HttpStatus.INTERNAL_SERVER_ERROR
        )
    }
}

class EmailAlreadyExistsException(email: String) : RuntimeException("Email already exists: $email")