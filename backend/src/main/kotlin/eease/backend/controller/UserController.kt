package eease.backend.controller

import eease.backend.model.Gender
import eease.backend.service.UserService
import jakarta.persistence.*
import org.springframework.web.bind.annotation.*
import java.time.LocalDate
import java.util.*

@RestController
@RequestMapping("/api/user")
class UserController(
    private val userService: UserService,
) {

    @GetMapping
    fun getCurrentUser() = userService.getCurrentUser()

    @PostMapping
    fun saveUser(@RequestBody user: UserReq) = userService.saveUser(user)

}

data class UserReq(
    val name: String,
    val gender: Gender,
    val birthDate: LocalDate,
    val languages: Set<String>,
    val userPrefs: UserPrefsReq,
)

data class UserPrefsReq(
    val ageFrom: Int = 18,
    val ageTo: Int = Int.MAX_VALUE,
    val genders: Set<Gender> = Gender.entries.toSet(),
    val placesToAvoid: Set<String>,
)