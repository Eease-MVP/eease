package eease.backend.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class ControllerAdvice /*: ResponseEntityExceptionHandler()*/ {

    @ExceptionHandler(EmailAlreadyExistsException::class)
    fun handle(ex: EmailAlreadyExistsException) = ResponseEntity(
        ErrorResponse(HttpStatus.CONFLICT, ex.message),
        HttpStatus.CONFLICT
    )

    @ExceptionHandler(BadCredentialsException::class)
    fun handle(ex: BadCredentialsException) = ResponseEntity(
        ErrorResponse(HttpStatus.NOT_FOUND, "Wrong email or password"),
        HttpStatus.NOT_FOUND
    )

    @ExceptionHandler
    fun handle(ex: UsernameNotFoundException) = ResponseEntity(
        ErrorResponse(HttpStatus.NOT_FOUND, ex.message),
        HttpStatus.NOT_FOUND
    )

    @ExceptionHandler(Exception::class)
    fun handleGenericException(exception: Exception) = ResponseEntity(
        ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred: ${exception.message}"),
        HttpStatus.INTERNAL_SERVER_ERROR
    )
}

class EmailAlreadyExistsException(email: String) : RuntimeException("Email already exists: $email")


data class ErrorResponse(
    val status: HttpStatus,
    val message: String?,
    val timestamp: Long = System.currentTimeMillis(),
)