import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { User, setUser } from "@/store/user-slice";
import { Gender, Language } from "@/constants/ProfileInfo";
import { useRoute } from "@react-navigation/native";

const defaultUser: User = {
    username: "User Usersson",
    gender: Gender.FEMALE,
    age: 15,
    language: Language.sw
}
export default function SignInUpButtons() {
    const dispatch = useDispatch()
    const router = useRouter()
    return (
        <View style={styles.container}>
            <Pressable style={styles.signIn} onPress={() => {
                dispatch(setUser(defaultUser))
                router.replace("(tabs)")
            }
            }>
                <Text>Sign in</Text>
            </Pressable>

            <Link href="/sign_up" asChild={true}>
                <Pressable>
                    <Text style={styles.signUpText}>Sign up</Text>
                </Pressable>
            </Link>
        </View>
    );
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
});