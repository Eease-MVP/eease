package eease.backend.model

import jakarta.persistence.*

@Entity
@Table(name = "user_credentials")
data class UserCredentials(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(unique = true, nullable = false)
    val email: String,

    @Column(nullable = false)
    val hashedPassword: String,
)
