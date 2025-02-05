import {Alert, ActivityIndicator, StyleSheet, Text, View} from "react-native"
import React, {useState} from "react"
import {Link, useRouter} from "expo-router"
import {useFetchUserQuery, User, useUpdateUserMutation} from "@/store/user-api"
import {UserInfo} from "@/components/profile/UserInfo"
import {UserData} from "@/components/profile/UserInfo"
import {EeaseButton} from "@/components/EeaseButton"
import {VerticalLine} from "@/components/VerticalLine"
import CheckBox from '@react-native-community/checkbox'
import {Gender} from "@/constants/ProfileInfo"

export default function UserCreation() {
    const {data: user, isLoading: isUserLoading} = useFetchUserQuery()
    const [updateUser, {isLoading: isUpdating}] = useUpdateUserMutation()
    const router = useRouter()
    const [toggleCheckBoxTerms, setToggleCheckBoxTerms] = useState(false)

    // Initialize userData to match UserInfo's expected interface
    const [userData, setUserData] = useState<UserData>({
        name: user?.name ?? "",
        gender: user?.gender,
        birthDate: user?.birthDate ? new Date(user.birthDate) : null,
        languages: user?.languages ?? []
    })

    const handleUserDataChange = (newUserData: UserData) => {
        setUserData(newUserData)
    }

    const showAlert = () => {
        Alert.alert(
            "Incomplete Information",
            "Please fill in all required fields and accept the terms and conditions.",
            [{text: "OK"}]
        )
    }

    const next = async () => {
        if (!userData.name || !userData.gender || !userData.birthDate || !userData.languages.length || !toggleCheckBoxTerms) {
            showAlert()
            return
        }

        try {
            const updatedUser: User = {
                name: userData.name,
                gender: userData.gender,
                birthDate: userData.birthDate.toISOString().split('T')[0],
                languages: userData.languages,
                prefs: user?.prefs
            }

            await updateUser(updatedUser).unwrap()
            router.push("/profile/ReceptorPreferences")
        } catch (error) {
            console.error('Failed to update user:', error)
            Alert.alert(
                "Error",
                "Failed to update profile. Please try again.",
                [{text: "OK"}]
            )
        }
    }

    if (isUserLoading) {
        return <ActivityIndicator />
    }

    return (
        <View style={styles.container}>
            <UserInfo
                userData={userData}
                onUserDataChange={handleUserDataChange}
            />
            <VerticalLine />
            <View style={styles.termsContainer}>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        disabled={false}
                        value={toggleCheckBoxTerms}
                        onValueChange={(newValue: boolean) => setToggleCheckBoxTerms(newValue)}
                    />
                    <Text style={styles.label}>I accept the </Text>
                    <Link href="/profile/TermsPage" style={styles.link}>
                        terms and conditions
                    </Link>
                </View>
            </View>
            <EeaseButton
                title="Next"
                onPress={next}
                buttonStyle={{alignSelf: "stretch"}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 16,
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        margin: 8,
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
})
