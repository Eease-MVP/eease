package eease.backend.controller

import eease.backend.service.UserReq
import eease.backend.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/users")
class UserController(private val userService: UserService) {
    
    @GetMapping("/me")
    fun getCurrentUser(): ResponseEntity<UserReq> {
        val user = userService.getCurrentUser()
        return user?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity.notFound().build()
    }

    @PutMapping("/update")
    fun updateUser(@RequestBody userReq: UserReq): ResponseEntity<UserReq> {
        return userService.saveUser(userReq)?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity.notFound().build()
    }

    @GetMapping("/all")
    fun getAllUsers() = userService.getAll()
}