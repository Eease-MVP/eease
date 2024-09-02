import {Alert, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import React, {useState} from "react"
import {Link, useRouter} from "expo-router"
import {useFetchUserQuery, User, useUpdateUserMutation} from "@/store/user-api"
import {UserInfo} from "@/components/profile/UserInfo";
import EeaseButton from "@/components/EeaseButton";
import VerticalLine from "@/components/VerticalLine";


export default function UserCreation() {
    const {data: user} = useFetchUserQuery()
    const [updateUser] = useUpdateUserMutation()
    const router = useRouter()


    const [userData, setUserData] = useState({
        name: user?.name ?? "",
        gender: user?.gender,
        birthDate: user?.birthDate ? new Date(user.birthDate) : null,
        languages: user?.languages ?? [],
    })

    const [toggleCheckBoxTerms, setToggleCheckBoxTerms] = useState(false)
    const [toggleCheckBoxNewsletter, setToggleCheckBoxNewsletter] = useState(false)

    const handleInputChange = (update: { [key: string]: any }) => {
        setUserData((prevData) => ({
            ...prevData,
            ...update,
        }))
    }

    const next = async () => {
        const {name, gender, birthDate, languages} = userData
        if (name.length > 0 && gender && birthDate && languages.length > 0 && toggleCheckBoxTerms) {

            const updatedUser: User = {
                name: name,
                gender: gender,
                birthDate: birthDate.toDateString(),
                languages: languages,
                prefs: user?.prefs,
            }

            const {data, error} = await updateUser(updatedUser)
            if (error) {
                console.warn(error)
            } else {
                router.navigate("profile/ReceptorPreferences")
            }
        } else {
            showAlert()
        }
    }

    const showAlert = () => {
        Alert.alert(
            "Error",
            "You have to fill all the fields and agree to the terms and conditions.",
            [{text: "OK"}],
            {cancelable: true},
        )
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.title]}>Your profile</Text>
            <VerticalLine/>
            <UserInfo
                userData={userData}
                onUserDataChange={handleInputChange}/>
            <View style={{gap: 4}}>
                <NewsletterCheckBox
                    checked={toggleCheckBoxNewsletter}
                    onChange={() => setToggleCheckBoxNewsletter(!toggleCheckBoxNewsletter)}/>
                <TermsCheckBox
                    checked={toggleCheckBoxTerms}
                    onChange={() => setToggleCheckBoxTerms(!toggleCheckBoxTerms)}/>
            </View>
            <EeaseButton
                title="next"
                onPress={next}
                buttonStyle={{backgroundColor: "#4359cb"}}/>
        </View>
    )
}


type CheckBoxProps = { checked: boolean, onChange: () => void }

function NewsletterCheckBox({checked, onChange}: CheckBoxProps) {
    return (
        <View style={styles.checkboxContainer}>
            <TouchableOpacity style={styles.checkBox} onPress={onChange}>
                {checked && <Text>✓</Text>}
            </TouchableOpacity>
            <Text style={styles.checkboxText}>I want to receive the newsletter</Text>
        </View>
    )
}

function TermsCheckBox({checked, onChange}: CheckBoxProps) {
    return (
        <View style={styles.checkboxContainer}>
            <TouchableOpacity style={styles.checkBox} onPress={onChange}>
                {checked && <Text>✓</Text>}
            </TouchableOpacity>
            <Text style={styles.checkboxText}>
                I agree to the{" "}
                <Link href="/profile/termsPage" asChild={true}>
                    <Pressable>
                        <Text style={styles.underlineText}>terms and conditions</Text>
                    </Pressable>
                </Link>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 16,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "#6c7abe",
    },
    checkBox: {width: 20, height: 20, borderRadius: 5, borderWidth: 1, borderColor: "#000"},
    checkboxContainer: {flexDirection: "row", alignItems: "center"},
    checkboxText: {marginLeft: 10},
    underlineText: {textDecorationLine: "underline"},
})
