package eease.backend.security.jwt

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.stereotype.Component
import java.util.*
import javax.crypto.SecretKey

@Component
class JwtUtil(
    private val jwtProperties: JwtProperties,
) {
    private val secretKey: SecretKey = Keys.hmacShaKeyFor(
        jwtProperties.key.toByteArray()
    )

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

    fun extractId(token: String): Long? = try {
        Jwts.parser()
            .verifyWith(secretKey)
            .build()
            .parseSignedClaims(token)
            .payload
            .subject
            .toLong()
    } catch (e: Exception) {
        null
    }

    fun extractAllClaims(token: String): Claims = Jwts.parser()
        .verifyWith(secretKey)
        .build()
        .parseSignedClaims(token)
        .payload

    fun isValid(token: String, id: Long): Boolean {
        val tokenId = extractId(token)
        return tokenId == id && !isTokenExpired(token)
    }

    private fun isTokenExpired(token: String): Boolean {
        val expiration = extractAllClaims(token).expiration
        return expiration.before(Date())
    }
}