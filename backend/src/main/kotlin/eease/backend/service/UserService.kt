package eease.backend.service

import com.fasterxml.jackson.annotation.JsonFormat
import eease.backend.model.Gender
import eease.backend.model.Prefs
import eease.backend.model.User
import eease.backend.model.UserRepository
import jakarta.transaction.Transactional
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import java.time.LocalDate


@Service
interface UserService {
    fun getCurrentUser(): UserReq?
    fun saveUser(userReq: UserReq): UserReq?
    fun getAll(): List<User>
}

@Service
class EeaseUserService(
    private val userRepository: UserRepository,
) : UserService {

    override fun getCurrentUser(): UserReq? {
        val authentication = SecurityContextHolder.getContext().authentication
        val user = authentication?.principal as? EeaseUserDetails ?: return null
        val id = user.id

        return userRepository.findByIdOrNull(id)?.toReq()
    }

    @Transactional
    override fun saveUser(userReq: UserReq): UserReq? {
        val authentication = SecurityContextHolder.getContext().authentication
        val userDetails = authentication?.principal as? EeaseUserDetails
        val id = userDetails?.id ?: return null

        val user = userReq.asUser(id = id)
        println("creds is $userDetails, user is $user")

        return userRepository.save(user).toReq()
    }

    override fun getAll(): List<User> = userRepository.findAll()
}

data class UserReq(
    val name: String,
    val gender: Gender,
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "EEE MMM dd yyyy", locale = "en")
    val birthDate: LocalDate,
    val languages: Set<String>,
    val prefs: Prefs?,
) {
    data class Prefs(
        val ageFrom: Int = 18,
        val ageTo: Int = Int.MAX_VALUE,
        val genders: Set<Gender> = Gender.entries.toSet(),
        val placesToAvoid: Set<String> = emptySet(),
    )
}

private fun User.toReq() = UserReq(
    name = name,
    gender = gender,
    birthDate = birthDate,
    languages = languages,
    prefs = prefs?.run {
        UserReq.Prefs(
            ageFrom = ageFrom,
            ageTo = ageTo,
            genders = genders,
            placesToAvoid = placesToAvoid
        )
    }
)

fun UserReq.asUser(id: Long) = User(
    id = id,
    name = name,
    gender = gender,
    birthDate = birthDate,
    languages = languages,
    prefs = prefs?.run {
        Prefs(
            id = id,
            ageFrom = ageFrom,
            ageTo = ageTo,
            genders = genders,
            placesToAvoid = placesToAvoid
        )
    }
)