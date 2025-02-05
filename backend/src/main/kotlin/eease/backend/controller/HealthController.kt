package eease.backend.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class HealthController {
    @GetMapping("/health")
    fun healthCheck() = mapOf(
        "status" to "UP",
        "timestamp" to System.currentTimeMillis()
    )
} 