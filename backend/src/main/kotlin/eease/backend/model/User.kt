package eease.backend.model

import jakarta.persistence.*
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.time.LocalDate

@Entity
@Table(name = "users")
class User(
    @Id
    var id: Long,
    var name: String,
    @Enumerated(EnumType.STRING)
    var gender: Gender,
    var birthDate: LocalDate,
    @Convert(converter = ListConverter::class)
    var languages: Set<String>,
    @OneToOne(cascade = [CascadeType.ALL], orphanRemoval = true)
    var prefs: Prefs?,
)


@Entity
class Prefs(
    @Id
    var id: Long,
    var ageFrom: Int,
    var ageTo: Int,
    @Convert(converter = GenderConverter::class)
    var genders: Set<Gender>,

    @Convert(converter = ListConverter::class)
    var placesToAvoid: Set<String>,
)


enum class Gender { FEMALE, MALE, NON_BINARY, TRANSGENDER; }

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
private class ListConverter : AttributeConverter<Set<String>, String> {
    override fun convertToDatabaseColumn(attribute: Set<String>?): String {
        return attribute?.joinToString(",") ?: ""
    }

    override fun convertToEntityAttribute(dbData: String?): Set<String> {
        return dbData?.split(",")?.map { it }?.toSet() ?: emptySet()
    }
}

@Repository
interface UserRepository : JpaRepository<User, Long>