package eease.backend.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.filter.CommonsRequestLoggingFilter

@Configuration
class LoggingConfig {
    @Bean
    fun loggingFilter(): CommonsRequestLoggingFilter {
        return CommonsRequestLoggingFilter().apply {
            setIncludeQueryString(true)
            setIncludePayload(true)
            setMaxPayloadLength(10000)
            setIncludeHeaders(false)
            setAfterMessagePrefix("REQUEST DATA: ")
        }
    }
} 