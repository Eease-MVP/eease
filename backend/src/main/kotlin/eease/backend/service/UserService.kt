package eease.backend.service

import eease.backend.controller.UserReq
import eease.backend.model.User
import eease.backend.model.UserPrefs
import eease.backend.model.UserRepository
import jakarta.transaction.Transactional
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service


@Service
interface UserService {
    fun getCurrentUser(): ResponseEntity<User>
    fun saveUser(userReq: UserReq)
}

@Service
class EeaseUserService(
    private val userRepository: UserRepository,
) : UserService {

    override fun getCurrentUser(): ResponseEntity<User> {
        val authentication = SecurityContextHolder.getContext().authentication
        val id = authentication.credentials as? Long

        return userRepository.findByIdOrNull(id)?.let { ResponseEntity.ok(it) } ?: ResponseEntity.notFound().build()
    }

    @Transactional
    override fun saveUser(userReq: UserReq) {
        val authentication = SecurityContextHolder.getContext().authentication
        val id = authentication.credentials as? Long ?: return

        val user = userReq.asEntity(id = id)

        userRepository.save(user)
    }
}

private fun UserReq.asEntity(id: Long) = User(
    id = id,
    name = name,
    gender = gender,
    birthDate = birthDate,
    languages = languages,
    userPrefs = UserPrefs(
        id = id,
        ageFrom = userPrefs.ageFrom,
        ageTo = userPrefs.ageTo,
        genders = userPrefs.genders,
        placesToAvoid = userPrefs.placesToAvoid
    )
)