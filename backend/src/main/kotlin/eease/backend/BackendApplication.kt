package eease.backend

import eease.backend.security.JwtProperties
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication

@SpringBootApplication
@EnableConfigurationProperties(JwtProperties::class)
class BackendApplication

fun main(args: Array<String>) {
    runApplication<BackendApplication>(*args)
}
