package eease.backend.security

import eease.backend.security.jwt.JwtAuthenticationFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@EnableWebSecurity
@Configuration
class SecurityConfig(
    private val authenticationProvider: AuthenticationProvider,
) {
    @Bean
    fun securityFilterChain(
        http: HttpSecurity,
        jwtAuthenticationFilter: JwtAuthenticationFilter,
    ): SecurityFilterChain = with(http) {

        //  uncomment in order to be able to access H2 console through http://localhost:8080/h2-console/
        //  headers { headers -> headers.frameOptions(Customizer.withDefaults()).disable() }

        csrf { csrf -> csrf.disable() }
        authorizeHttpRequests { authorize ->
            authorize
                .requestMatchers("/api/auth/**", "/h2-console/**", "api/user/all/**").permitAll()
                .anyRequest().authenticated()
        }
        sessionManagement { it.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }
        authenticationProvider(authenticationProvider)
        addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter::class.java)
        build()
    }
}