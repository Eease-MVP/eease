package eease.backend.security

import org.springframework.stereotype.Component
import java.util.*
import java.util.concurrent.ConcurrentHashMap

@Component
class RateLimiter {
    private val requestCounts = ConcurrentHashMap<String, RequestCount>()
    private val cleanupInterval = 3600000L // 1 hour

    init {
        // Periodic cleanup
        Timer().scheduleAtFixedRate(object : TimerTask() {
            override fun run() {
                cleanup()
            }
        }, cleanupInterval, cleanupInterval)
    }

    data class RequestCount(
        var count: Int = 0,
        var lastReset: Long = System.currentTimeMillis()
    )

    fun checkRateLimit(ip: String, maxRequests: Int = 100): Boolean {
        val now = System.currentTimeMillis()
        val requestCount = requestCounts.computeIfAbsent(ip) { RequestCount() }
        
        // Reset counter if more than a minute has passed
        if (now - requestCount.lastReset > 60000) {
            requestCount.count = 0
            requestCount.lastReset = now
        }
        
        if (requestCount.count >= maxRequests) {
            return false
        }
        
        requestCount.count++
        return true
    }

    private fun cleanup() {
        val now = System.currentTimeMillis()
        requestCounts.entries.removeIf { (_, value) ->
            now - value.lastReset > 3600000L
        }
    }
} 