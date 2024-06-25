package eease.backend.model

import jakarta.persistence.*
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Entity
@Table(name = "users")
class User(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
    var name: String,
    @Enumerated(EnumType.STRING)
    var gender: Gender,
    var birthYear: Int,
    var language: String,
    @OneToOne(cascade = [CascadeType.ALL], orphanRemoval = true)
    @JoinColumn(name = "user_prefs_id", referencedColumnName = "id")
    var userPrefs: UserPrefs,
)


@Entity
class UserPrefs(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
    var ageFrom: Int,
    var ageTo: Int,
    @ElementCollection(targetClass = Gender::class)
    @CollectionTable(name = "user_prefs_genders", joinColumns = [JoinColumn(name = "user_prefs_id")])
    @Enumerated(EnumType.STRING)
    var genders: List<Gender>,

    @ElementCollection(targetClass = String::class)
    var placesToAvoid: List<String>
)


enum class Gender(val value: String) {
    FEMALE("Female"),
    MALE("Male"),
    NON_BINARY("Non-binary"),
    TRANSGENDER("Transgender");
}


@Repository
interface UserRepository : JpaRepository<User, Long>