import {Pressable, StyleSheet, Text, View} from "react-native"
import {Link, useRouter} from "expo-router"


export default function SignInUpButtons() {
    const router = useRouter()
    return (
        <View style={styles.container}>
            <Link href="/sign_in" asChild={true}>
                <Pressable style={styles.signIn}>
                    <Text>Sign in</Text>
                </Pressable>
            </Link>

            <Link href="/sign_up" asChild={true}>
                <Pressable>
                    <Text style={styles.signUpText}>Sign up</Text>
                </Pressable>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        gap: 12,
    },
    signIn: {
        backgroundColor: 'rgba(255,255,255,0.67)',
        paddingHorizontal: 64,
        paddingVertical: 12,
        borderRadius: 15,
    },
    signUpText: {
        color: '#fff',
        textDecorationLine: 'underline',
    },
})