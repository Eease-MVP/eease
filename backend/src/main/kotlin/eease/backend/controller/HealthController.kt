package eease.backend.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class HealthController {
    @GetMapping("/app/health")
    fun healthCheck() = mapOf(
        "status" to "UP",
         "service" to "Eease Backend",
        "timestamp" to System.currentTimeMillis(),
        "version" to "1.0.0"
    )
} 