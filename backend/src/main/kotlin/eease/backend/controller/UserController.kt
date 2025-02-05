package eease.backend.controller

import eease.backend.service.UserReq
import eease.backend.service.UserService
import jakarta.persistence.*
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api/user")
class UserController(
    private val userService: UserService,
) {
    @GetMapping
    fun getUser(authentication: Authentication): ResponseEntity<User> {
        val email = authentication.name
        return userService.getUserByEmail(email)?.let {
            ResponseEntity.ok(it)
        } ?: ResponseEntity.notFound().build()
    }

    @PutMapping
    fun updateUser(
        @RequestBody user: User,
        authentication: Authentication
    ): ResponseEntity<User> {
        val email = authentication.name
        return try {
            val updatedUser = userService.updateUser(email, user)
            ResponseEntity.ok(updatedUser)
        } catch (e: Exception) {
            ResponseEntity.badRequest().build()
        }
    }
}
