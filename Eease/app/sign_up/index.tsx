import {ActivityIndicator, Animated, Button, StyleSheet, Text, TextInput, View} from "react-native"
import {useEffect, useRef, useState} from "react"
import {useRouter} from "expo-router"
import {useSignInMutation, useSignUpMutation} from "@/store/user-api"
import {getErrorMessage, validateEmail} from "@/app/sign_up/signUtils";


export default function SignInScreen() {
    const [email, setEmail] = useState('john.doe@example.com')
    const [password, setPassword] = useState('password123')

    //const [isLoading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const fadeAnim = useRef(new Animated.Value(0)).current

    const [signUp, {isLoading: isSigningUp}] = useSignUpMutation()
    const [signIn, {isLoading: isSigningIn}] = useSignInMutation()
    useEffect(() => {
        if (errorMessage) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start()
        } else {
            fadeAnim.setValue(0)
        }
    }, [errorMessage])

    const router = useRouter()


    const handleSignUp = async () => {
        setErrorMessage(null)

        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address.')
            return
        }
        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.')
            return
        }
        const {error} = await signUp({email, password})
        if (error) {
            setErrorMessage(getErrorMessage(error))
        } else {
            const {error} = await signIn({email, password})
            if (error) {
                setErrorMessage(getErrorMessage(error))
            } else {
                setErrorMessage(null)
                router.dismissAll()
                router.replace("/sign_up/createUser")
            }
        }
    }

    return (
        <View style={styles.background}>
            {errorMessage && (
                <Animated.View style={{...styles.errorContainer, opacity: fadeAnim}}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                </Animated.View>
            )}
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={email => {
                    setErrorMessage(null)
                    setEmail(email)
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#aaa"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={password => {
                    setErrorMessage(null)
                    setPassword(password)
                }}
                secureTextEntry
                autoCapitalize="none"
                placeholderTextColor="#aaa"
            />
            <Button title="Sign up" onPress={handleSignUp}/>
            {isSigningIn && <Text>Creating user..</Text>}
            {isSigningUp && <Text>Signing in...</Text>}
            {isSigningIn || isSigningUp && <ActivityIndicator color={"blue"}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    input: {
        width: 256,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    errorContainer: {
        padding: 10,
        marginBottom: 20,
        backgroundColor: 'red',
        borderRadius: 4,
    },
    errorText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})
