package eease.backend.controller

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
    @PostMapping("/sign_up")
fun signUp(@RequestBody signUpRequest: SignRequest) {
    println("Received sign-up request: $signUpRequest")
    authenticationService.signUp(
        email = signUpRequest.email,
        password = signUpRequest.password,
    )
}


    @PostMapping("/sign_in")
    fun signIn(
        @RequestBody signInRequest: SignRequest,
    ): SignResponse = authenticationService.signIn(
        email = signInRequest.email,
        password = signInRequest.password,
    )
}

data class SignRequest(
    val email: String,
    val password: String,
)

data class SignResponse(
    val accessToken: String,
)