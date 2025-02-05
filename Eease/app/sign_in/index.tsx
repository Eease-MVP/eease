import { ActivityIndicator, StyleSheet, Text, TextInput, View } from "react-native"
import { useState } from "react"
import { useRouter } from "expo-router"
import { useSignInMutation } from "@/store/user-api"
import { EeaseButton } from "@/components/EeaseButton"
import EeaseBackground from "@/components/EeaseBackground"

export default function SignInScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    
    const [signIn, { isLoading }] = useSignInMutation()
    const router = useRouter()

    const handleSignIn = async () => {
        if (!email || !password) {
            setErrorMessage('Please fill in all fields')
            return
        }

        try {
            await signIn({ email, password }).unwrap()
            router.replace("/(tabs)")
        } catch (error) {
            setErrorMessage('Invalid email or password')
        }
    }

    return (
        <EeaseBackground>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                {errorMessage ? (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                ) : null}
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <EeaseButton 
                        title="Sign In" 
                        onPress={handleSignIn}
                    />
                )}
            </View>
        </EeaseBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
})
