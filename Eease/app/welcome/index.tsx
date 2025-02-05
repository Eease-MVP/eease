import { StyleSheet, View } from "react-native"
import EeaseBackground from "@/components/EeaseBackground"
import SignInUpButtons from "@/components/sign/SignInUpButtons"

export default function WelcomeScreen() {
    return (
        <EeaseBackground>
            <View style={styles.container}>
                <SignInUpButtons />
            </View>
        </EeaseBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})