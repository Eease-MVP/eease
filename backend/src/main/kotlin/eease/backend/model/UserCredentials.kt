package eease.backend.model

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import org.springframework.data.jpa.repository.JpaRepository
import java.security.SecureRandom
import java.util.*

@Entity
class UserCredentials(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
    var email: String,
    var password: String,
    var salt: String,
) {
    override fun toString(): String {
        return "email: $email, password: $password, salt: $salt"
    }

    companion object {
        fun generateSalt(): String {
            val random = SecureRandom()
            val salt = ByteArray(16)
            random.nextBytes(salt)
            return Base64.getEncoder().encodeToString(salt)
        }
    }
}

interface UserRepository : JpaRepository<UserCredentials, Long> {
    fun findUserCredentialsByEmailIgnoreCase(email: String): UserCredentials?
}



