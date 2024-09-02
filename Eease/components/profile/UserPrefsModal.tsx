import {Prefs, User, useUpdateUserMutation} from "@/store/user-api"
import {useState} from "react"
import {StyleSheet, Text, View} from "react-native"
import EeaseButton from "@/components/EeaseButton";
import UserPrefences from "@/components/profile/UserPrefences";


export default function UserPrefsModal({user, onUpdate}: { user: User, onUpdate: () => void }) {
    const [updateUser, {isLoading, error, isSuccess}] = useUpdateUserMutation()

    const [prefs, setPrefs] = useState<Prefs>(user?.prefs ?? {genders: [], ageFrom: 18, ageTo: 100, placesToAvoid: []})

    const update = async () => {
        if (prefs.genders.length > 0) {
            const {data} = await updateUser({
                ...user,
                prefs,
            })
            if (data)
                onUpdate()
        }
    }
    return (
        <View style={styles.container}>
            <UserPrefences
                prefs={prefs}
                onPrefsUpdate={setPrefs}/>
            <View
                style={{
                    width: "100%",
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />
            <View style={styles.row}>
                {isLoading && <Text>updating user information...</Text>}
                <EeaseButton title="Update Preferences" onPress={update}/>
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