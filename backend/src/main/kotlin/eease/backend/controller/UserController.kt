package eease.backend.controller

import eease.backend.model.Gender
import eease.backend.model.UserPrefs
import eease.backend.service.UserService
import jakarta.persistence.*
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api/user")
class UserController(
    private val userService: UserService,
) {

    @GetMapping
    fun getUser() = userService.getCurrentUser()

    @PostMapping
    fun saveUser(@RequestBody user: UserReq) = userService.saveUser(user)

}


data class UserReq(
    val name: String,
    val gender: Gender,
    val birthYear: Int,
    val language: String,
    val userPrefs: UserPrefs,
)

data class UserPrefsReq(
    val ageFrom: Int = 18,
    val ageTo: Int = Int.MAX_VALUE,
    val genders: List<Gender> = Gender.entries,
    val placesToAvoid: List<String>,
)