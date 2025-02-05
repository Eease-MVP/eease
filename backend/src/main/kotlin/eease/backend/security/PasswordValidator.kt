package eease.backend.security

object PasswordValidator {
    private const val MIN_LENGTH = 8
    private val PASSWORD_PATTERN = """^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#${'$'}%^&+=])(?=\S+$).{$MIN_LENGTH,}$""".toRegex()
    
    fun isValid(password: String): Boolean {
        return password.matches(PASSWORD_PATTERN)
    }

    fun getValidationMessage(): String {
        return "Password must be at least $MIN_LENGTH characters long and contain at least: " +
               "one digit, one lowercase letter, one uppercase letter, " +
               "one special character (@#$%^&+=), and no whitespace"
    }
} 