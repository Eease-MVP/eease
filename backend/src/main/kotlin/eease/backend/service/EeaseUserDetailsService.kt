package eease.backend.service

import eease.backend.model.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class EeaseUserDetailsService(
    @Autowired private val userRepository: UserRepository,
) : UserDetailsService {

    override fun loadUserByUsername(email: String) = userRepository
        .findUserCredentialsByEmailIgnoreCase(email)
        ?.let {
            User.builder()
                .username(it.email)
                .password(it.password)
                .build()
        } ?: throw UsernameNotFoundException("The user with email: $email doesn't exist")

}