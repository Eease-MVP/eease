package eease.backend.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class HealthController {
    @GetMapping("/health")
    fun healthCheck() = mapOf(
        "status" to "UP",
        "service" to "Eease",
        "timestamp" to System.currentTimeMillis(),
        "version" to "1.0.0",
        "environment" to "production",
        "deployedAt" to System.currentTimeMillis()
    )
}