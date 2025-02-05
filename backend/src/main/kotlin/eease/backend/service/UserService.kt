package eease.backend.service

import com.fasterxml.jackson.annotation.JsonFormat
import eease.backend.model.Gender
import eease.backend.model.Prefs
import eease.backend.model.User
import eease.backend.model.UserRepository
import jakarta.transaction.Transactional
import org.slf4j.LoggerFactory
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
    private val logger = LoggerFactory.getLogger(EeaseUserService::class.java)

    override fun getCurrentUser(): UserReq? {
        val authentication = SecurityContextHolder.getContext().authentication
        val userDetails = authentication?.principal as? EeaseUserDetails
        return userDetails?.id?.let { id ->
            userRepository.findById(id).orElse(null)?.toReq()
        }
    }

    @Transactional
    override fun saveUser(userReq: UserReq): UserReq? {
        try {
            validateUserRequest(userReq)
            
            val authentication = SecurityContextHolder.getContext().authentication
            val userDetails = authentication?.principal as? EeaseUserDetails
            val id = userDetails?.id ?: return null

            val user = userReq.asUser(id = id)
            logger.info("Saving user profile for ID: $id")
            return userRepository.save(user).toReq()
        } catch (e: Exception) {
            logger.error("Error saving user profile", e)
            throw e
        }
    }

    private fun validateUserRequest(userReq: UserReq) {
        require(userReq.name.isNotBlank()) { "Name cannot be empty" }
        require(userReq.languages.isNotEmpty()) { "At least one language must be selected" }
        require(userReq.birthDate.isBefore(LocalDate.now())) { "Birth date must be in the past" }
        
        userReq.prefs?.let { prefs ->
            require(prefs.ageFrom >= 18) { "Minimum age must be 18 or above" }
            require(prefs.ageTo >= prefs.ageFrom) { "Maximum age must be greater than minimum age" }
            require(prefs.genders.isNotEmpty()) { "At least one gender preference must be selected" }
        }
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