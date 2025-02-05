package eease.backend.model

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserCredentialsRepository : JpaRepository<UserCredentials, Long> {
    fun findUserCredentialsByEmailIgnoreCase(email: String): UserCredentials?
} 