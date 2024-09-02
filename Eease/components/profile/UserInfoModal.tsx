import {UserData, UserInfo} from "@/components/profile/UserInfo"
import {User, useUpdateUserMutation} from "@/store/user-api"
import {useState} from "react"
import {StyleSheet, Text, View} from "react-native"
import EeaseButton from "@/components/EeaseButton";


export default function UserInfoModal({user, onUpdate}: { user: User, onUpdate: () => void }) {
    const [updateUser, {isLoading, error, isSuccess}] = useUpdateUserMutation()

    const initialData: UserData = {
        name: user.name,
        gender: user.gender,
        birthDate: new Date(user.birthDate),
        languages: user.languages,
    }

    const [userData, setUserData] = useState(initialData);

    const update = async () => {
        if (userData.name && userData.gender && userData.birthDate && userData.languages && userData.languages?.length > 0) {
            const {data} = await updateUser({
                ...user,
                name: userData.name,
                gender: userData.gender,
                birthDate: userData.birthDate!!.toDateString(),
                languages: userData.languages,
            })
            if (data) {
                onUpdate()
            }
        }
    }
    return (
        <View style={styles.container}>
            <UserInfo
                userData={userData}
                onUserDataChange={setUserData}
            />
            <View
                style={{
                    width: "100%",
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />
            <View style={styles.row}>
                {isLoading && <Text>updating user information...</Text>}
                <EeaseButton title="Update Profile" onPress={update}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 16,
        width: "100%",
        borderColor: "#c7c7c7",
        borderWidth: 2,
        borderRadius: 16,
        alignItems: "center",
        gap: 4,
    },
    row: {
        flexDirection: "row",
        gap: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})