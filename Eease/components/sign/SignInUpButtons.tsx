import {Pressable, StyleSheet, Text, View} from "react-native";

export default function SignInUpButtons() {
    return <View style={styles.container}>
        <Pressable style={styles.signIn}>
            <Text>Sign in</Text>
        </Pressable>
        <Pressable>
            <Text style={styles.signUpText}>Sign up</Text>
        </Pressable>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        gap: 5,
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
});