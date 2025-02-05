package eease.backend.config

import org.slf4j.LoggerFactory
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Component

@Component
class StartupValidator {
    private val logger = LoggerFactory.getLogger(StartupValidator::class.java)

    @EventListener(ApplicationReadyEvent::class)
    fun validateOnStartup() {
        logger.info("Application started successfully")
        
        // Validate required environment variables
        val requiredEnvVars = listOf("JWT_SECRET_KEY", "H2_PASSWORD")
        val missing = requiredEnvVars.filter { System.getenv(it).isNullOrBlank() }
        
        if (missing.isNotEmpty()) {
            logger.warn("Missing environment variables: $missing")
            logger.warn("Using default values for development")
        }
    }
} 