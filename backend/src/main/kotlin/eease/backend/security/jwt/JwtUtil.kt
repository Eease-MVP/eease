package eease.backend.security.jwt

import eease.backend.service.EeaseUserDetails
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component
import java.util.*

@Component
class JwtUtil(
    private val jwtProperties: JwtProperties,
) {
    private val secretKey = Keys.hmacShaKeyFor(jwtProperties.key.toByteArray())

    fun generate(
        id: Long,
        expirationDate: Date = Date(System.currentTimeMillis() + jwtProperties.accessTokenExpiration),
        additionalClaims: Map<String, Any> = emptyMap(),
    ): String = Jwts.builder()
        .claims()
        .subject(id.toString())
        .issuedAt(Date(System.currentTimeMillis()))
        .expiration(expirationDate)
        .add(additionalClaims)
        .and()
        .signWith(secretKey)
        .compact()

    fun isValid(token: String, userDetails: EeaseUserDetails): Boolean {
        val id = extractId(token)
        return userDetails.id == id && !isExpired(token)
    }

    fun extractId(token: String): Long? = getAllClaims(token).subject?.toLong()

    fun isExpired(token: String): Boolean =
        getAllClaims(token)
            .expiration
            .before(Date(System.currentTimeMillis()))

    private fun getAllClaims(token: String): Claims {
        val parser = Jwts.parser()
            .verifyWith(secretKey)
            .build()
        return parser
            .parseSignedClaims(token)
            .payload
    }
}

@ConfigurationProperties("jwt")
data class JwtProperties(
    val key: String,
    val accessTokenExpiration: Long,
)