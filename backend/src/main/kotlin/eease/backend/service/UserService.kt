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
interface UserService{
    fun getCurrentUser(): ResponseEntity<User>
    fun saveUser(userReq: UserReq)
}
@Service
class EeaseUserService(
    private val userRepository: UserRepository,
): UserService {

    override fun getCurrentUser(): ResponseEntity<User> {
        val authentication = SecurityContextHolder.getContext().authentication
        val id = authentication.credentials as? Long

        return userRepository.findByIdOrNull(id)?.let { ResponseEntity.ok(it) } ?: ResponseEntity.notFound().build()
    }

    @Transactional
    override fun saveUser(userReq: UserReq) {
        val authentication = SecurityContextHolder.getContext().authentication
        val id = authentication.credentials as? Long ?: return

        val userPrefs = UserPrefs(
            id = id,
            ageFrom = userReq.userPrefs.ageFrom,
            ageTo = userReq.userPrefs.ageTo,
            genders = userReq.userPrefs.genders,
            placesToAvoid = userReq.userPrefs.placesToAvoid
        )

        val user = User(
            id = id,
            name = userReq.name,
            gender = userReq.gender,
            birthYear = userReq.birthYear,
            language = userReq.language,
            userPrefs = userPrefs
        )
        userRepository.save(user)
    }
}