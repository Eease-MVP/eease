package eease.backend.dto

import java.time.LocalDate

data class UserResponse(
    val id: Long,
    val name: String,
    val email: String,
    val profileComplete: Boolean
)

data class ErrorDto(
    val message: String,
    val code: String,
    val timestamp: Long = System.currentTimeMillis()
) 