package eease.backend.service

import eease.backend.model.UserCredentialsRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class EeaseUserDetailsService(
    @Autowired private val userCredentialsRepository: UserCredentialsRepository,
) : UserDetailsService {

    override fun loadUserByUsername(email: String): UserDetails = userCredentialsRepository
        .findUserCredentialsByEmailIgnoreCase(email)
        ?.let {
            EeaseUserDetails(
                id = it.id!!,
                username = it.email,
                password = it.hashedPassword,
                authorities = emptyList()
            )
        } ?: throw UsernameNotFoundException("The user with email: $email doesn't exist")

    fun loadUserById(id: Long) : UserDetails = userCredentialsRepository.findByIdOrNull(id)
        ?.let {
            EeaseUserDetails(
                id = it.id!!,
                username = it.email,
                password = it.hashedPassword,
                authorities = emptyList()
            )
        } ?: throw UsernameNotFoundException("The user with email: $id doesn't exist")
}


data class EeaseUserDetails(
    val id: Long,
    private val username: String,
    private val password: String,
    private val authorities: Collection<GrantedAuthority>,
) : UserDetails {

    override fun getUsername(): String = username
    override fun getPassword(): String = password
    override fun getAuthorities(): Collection<GrantedAuthority> = authorities
    override fun isAccountNonExpired(): Boolean = true
    override fun isAccountNonLocked(): Boolean = true
    override fun isCredentialsNonExpired(): Boolean = true
    override fun isEnabled(): Boolean = true
}