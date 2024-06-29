package eease.backend.controller

import eease.backend.service.AuthenticationRequest
import eease.backend.service.AuthenticationResponse
import eease.backend.service.AuthenticationService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/auth")
class AuthorizeController(
    private val authenticationService: AuthenticationService,
) {

    @PostMapping("/authenticate")
    fun authenticate(
        @RequestBody authenticationRequest: AuthenticationRequest,
    ): AuthenticationResponse = authenticationService.authenticate(authenticationRequest)

    @PostMapping("/register")
    fun registerUser(
        @RequestBody authenticationRequest: AuthenticationRequest,
    ): AuthenticationResponse = authenticationService.register(authenticationRequest)
}
