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
    fun getCurrentUser(): ResponseEntity<UserReq> = userService.getCurrentUser()
        ?.let { ResponseEntity.ok(it) } ?: ResponseEntity.notFound().build()

    @PostMapping
    fun saveUser(@RequestBody user: UserReq): ResponseEntity<UserReq> = userService.saveUser(user)
        ?.let { ResponseEntity.ok(it) } ?: ResponseEntity.notFound().build()

    @GetMapping("/all")
    fun getAllUsers() = userService.getAll()
}
