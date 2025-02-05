package eease.backend.security.jwt

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties(prefix = "jwt")
data class JwtProperties(
    val key: String,
    val accessTokenExpiration: Long,
) {
    init {
        require(key.length >= 32) { "JWT key must be at least 32 characters long" }
        require(accessTokenExpiration > 0) { "JWT expiration must be positive" }
    }
} 