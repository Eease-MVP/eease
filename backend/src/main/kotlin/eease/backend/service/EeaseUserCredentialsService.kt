package eease.backend.service

import eease.backend.model.UserCredentials
import eease.backend.model.UserCredentialsRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
interface UserCredentialsService {
    fun getUserCredentials(id: Long): UserCredentials?
    fun geAllUsers(): List<UserCredentials>
}

@Service
class EeaseUserCredentialsService(
    private val userCredentialsRepository: UserCredentialsRepository,
) : UserCredentialsService {
    override fun getUserCredentials(id: Long) = userCredentialsRepository.findByIdOrNull(id)

    override fun geAllUsers(): List<UserCredentials> = userCredentialsRepository.findAll()
}