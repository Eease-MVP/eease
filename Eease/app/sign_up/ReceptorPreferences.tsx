import React, {useState} from "react";
import {ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {useRouter} from "expo-router";
import {Slider} from '@miblanchard/react-native-slider';
import {CheckBox} from "react-native-elements";
import {Gender} from "@/constants/ProfileInfo";
import {useFetchUserQuery, User, useUpdateUserMutation} from "@/store/user-api";


const genders = Object.values(Gender)

const ReceptorPreferences = () => {
    const {data: user, error, isLoading, refetch} = useFetchUserQuery()
    const [updateUser, {isLoading: isUpdating, error: updateError, isSuccess}] = useUpdateUserMutation()


    const router = useRouter();

    const [preferredAgeGap, setPreferredAgeGap] = useState([18, 100]);
    const [preferredGenders, setPreferredGenders] = useState<Gender[]>([]);
    const [cityToAvoid, setCityToAvoid] = useState("");

    const handleSavePreferences = async () => {
        if (preferredGenders.length === 0) {
            Alert.alert("Error", "Please fill all the fields.");
            return;
        }

        const userPrefs = {
            ageFrom: preferredAgeGap[0],
            ageTo: preferredAgeGap[1],
            genders: preferredGenders,
            placesToAvoid: Array<string>(),
        }
        const updatedUser: User = {...user!!, prefs: userPrefs}

        // Save preferences logic here
        await updateUser(updatedUser)

        if (isSuccess) {
            console.log("preferences saved:", {preferredAgeGap, selectedGenders: preferredGenders, cityToAvoid});
            Alert.alert("Preferences saved", "Your preferences have been saved successfully");


            // Navigate to the main tab screen after saving preferences
            router.replace("(tabs)");
        }


    };

    const toggleGenderSelection = (gender: Gender) => {
        setPreferredGenders((prevSelectedGenders) => {
            if (prevSelectedGenders.some(g => g.valueOf() === gender.valueOf())) {
                return prevSelectedGenders.filter((g) => g.valueOf() !== gender.valueOf());
            } else {
                return [...prevSelectedGenders, gender];
            }
        });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Receptor Preferences</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Gender</Text>
                {genders.map((gender) => (
                    <View key={gender} style={styles.checkboxContainer}>
                        <CheckBox
                            checked={preferredGenders.some(selected => selected === gender)}
                            onPress={() => toggleGenderSelection(gender)}
                            checkedColor="#6f7dc7"
                            containerStyle={styles.checkbox}
                        />
                        <Text style={styles.label}>{gender.valueOf()}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Age</Text>
                <Slider
                    minimumValue={18}
                    maximumValue={100}
                    value={preferredAgeGap}
                    step={1}
                    minimumTrackTintColor={"#6f7dc7"}
                    onValueChange={setPreferredAgeGap}/>
                <Text style={styles.ageText}>Selected Age Range: {preferredAgeGap[0]} - {preferredAgeGap[1]}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Location I want to avoid:</Text>
                <TextInput
                    style={styles.input}
                    value={cityToAvoid}
                    onChangeText={setCityToAvoid}
                    placeholder="Type the city you want to avoid"
                />
            </View>

            <Pressable style={styles.button} onPress={handleSavePreferences}>
                <Text style={styles.buttonText}>Save Preferences</Text>
            </Pressable>

        {isUpdating && <ActivityIndicator/>}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#6f7dc7",
    },
    section: {
        marginBottom: 30, // Increased margin to ensure no overlap
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        backgroundColor: "#D9D9D9",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: "#000",
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        color: "#000",
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
        fontSize: 16,
        marginTop: 10,
    },
    button: {
        backgroundColor: "#6f7dc7",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    checkbox: {
        padding: 0,
        margin: 0,
        marginRight: 10,
        backgroundColor: "transparent",
        borderWidth: 0,
    },
    ageText: {
        marginTop: 10,
        fontSize: 16,
        color: "#555",
    },
});

export default ReceptorPreferences;
