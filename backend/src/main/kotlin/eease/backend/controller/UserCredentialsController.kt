package eease.backend.controller

import eease.backend.model.UserCredentials
import eease.backend.model.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.ResponseEntity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*


@EnableWebSecurity
@RestController
@RequestMapping("/api/users")
class UserCredentialsController(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val userDetailsService: UserDetailsService,
) {

  /*  @Autowired
    var authenticationService: AuthenticationService? = null*/

    @GetMapping("/{id}")
    fun getUser(@PathVariable id: Long) = ResponseEntity.ofNullable(userRepository.findByIdOrNull(id))


    @GetMapping
    fun geAllUsers(): List<UserCredentials> = userRepository.findAll()

}