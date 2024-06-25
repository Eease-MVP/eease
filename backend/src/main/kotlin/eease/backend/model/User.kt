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
    @Convert(converter = GenderConverter::class)
    var genders: Set<Gender>,

    @Convert(converter = PlacesConverter::class)
    var placesToAvoid: Set<String>,
)


enum class Gender(val value: String) {
    FEMALE("Female"),
    MALE("Male"),
    NON_BINARY("Non-binary"),
    TRANSGENDER("Transgender");
}

@Converter
private class GenderConverter : AttributeConverter<Set<Gender>, String> {

    override fun convertToDatabaseColumn(attribute: Set<Gender>?): String {
        return attribute?.joinToString(",") { it.name } ?: ""
    }

    override fun convertToEntityAttribute(dbData: String?): Set<Gender> {
        return dbData?.split(",")?.map { Gender.valueOf(it) }?.toSet() ?: emptySet()
    }
}

@Converter
private class PlacesConverter : AttributeConverter<Set<String>, String> {
    override fun convertToDatabaseColumn(attribute: Set<String>?): String {
        return attribute?.joinToString(",") ?: ""
    }

    override fun convertToEntityAttribute(dbData: String?): Set<String> {
        return dbData?.split(",")?.map { it }?.toSet() ?: emptySet()
    }
}

@Repository
interface UserRepository : JpaRepository<User, Long>