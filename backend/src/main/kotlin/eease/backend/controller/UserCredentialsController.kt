package eease.backend.controller

import eease.backend.model.UserCredentials
import eease.backend.service.UserCredentialsService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/users")
class UserCredentialsController(
    private val userCredentialsService: UserCredentialsService,
) {

    @GetMapping("/{id}")
    fun getUserCredentials(
        @PathVariable id: Long,
    ): ResponseEntity<UserCredentials> = userCredentialsService.getUserCredentials(id = id)?.let { ResponseEntity.ok(it) } ?: ResponseEntity.notFound().build()


    @GetMapping
    fun geAllUserCredentials(): List<UserCredentials> = userCredentialsService.geAllUsers()

}