package eease.backend.model

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import org.springframework.data.jpa.repository.JpaRepository

@Entity
class UserCredentials(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
    var email: String,
    var hashedPassword: String,
) {
    override fun toString(): String {
        return "email: $email, password: $hashedPassword"
    }
}

interface UserCredentialsRepository : JpaRepository<UserCredentials, Long> {
    fun findUserCredentialsByEmailIgnoreCase(email: String): UserCredentials?
}



