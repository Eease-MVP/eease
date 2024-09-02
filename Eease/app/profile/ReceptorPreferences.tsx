import React, {useState} from "react";
import {ActivityIndicator, Alert, StyleSheet, Text, View} from "react-native";
import {useRouter} from "expo-router";
import {Prefs, useFetchUserQuery, useUpdateUserMutation} from "@/store/user-api";
import EeaseButton from "@/components/EeaseButton";
import VerticalLine from "@/components/VerticalLine";
import UserPrefences from "@/components/profile/UserPrefences";



export default function ReceptorPreferences() {
    const {data: user, error, isLoading, refetch, isSuccess: isLoaded} = useFetchUserQuery()
    const [updateUser, {isLoading: isUpdating, error: updateError, isSuccess}] = useUpdateUserMutation()

    const router = useRouter();

    const [prefs, setPrefs] = useState<Prefs>(user?.prefs ?? {genders: [], ageFrom: 18, ageTo: 100, placesToAvoid: []})

    const handleSavePreferences = async () => {
        if (prefs.genders.length === 0) {
            Alert.alert("Error", "Please fill all the fields.");
            return;
        }

        // Save preferences logic here
        await updateUser({...user!!, prefs})

        if (isSuccess) {
            console.log("preferences saved:", prefs);
            Alert.alert("UserPrefences saved", "Your preferences have been saved successfully");


            // Navigate to the main tab screen after saving preferences
            router.replace("(tabs)");
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Receptor UserPrefences</Text>
            <VerticalLine/>

            {isLoaded && <>
                <UserPrefences prefs={prefs} onPrefsUpdate={setPrefs}/>
                <EeaseButton
                    title="Save UserPrefences"
                    onPress={handleSavePreferences}
                    buttonStyle={{backgroundColor: "#4359cb", marginTop: 16}}/>
            </>
            }

            {(isUpdating || isLoading) && <ActivityIndicator/>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 32,
        gap: 24,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "#6f7dc7",
    },
})
