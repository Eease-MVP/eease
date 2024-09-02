import React, {useState} from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";
import {Slider} from '@miblanchard/react-native-slider';
import {CheckBox} from "react-native-elements";
import {Gender} from "@/constants/ProfileInfo";
import ViewWithTitle from "@/components/ViewWithTitle";
import {Prefs} from "@/store/user-api";


const genders = Object.values(Gender)

type preferencesProps = {
    prefs: Prefs
    onPrefsUpdate: (prefs: Prefs) => void
}

export default function UserPrefences({prefs, onPrefsUpdate}: preferencesProps) {

    const [cityToAvoid, setCityToAvoid] = useState("");
    const handleUpdate = (partial: Partial<Prefs>) => {
        onPrefsUpdate({...prefs, ...partial})
    }
    return <View style={styles.container}>
        <ViewWithTitle title="Gender preferences">
            {genders.map((gender) => {
                    const checked = prefs.genders.some(selected => selected === gender)
                    return (
                        <View key={gender} style={styles.checkboxContainer}>
                            <GenderCheckBox
                                gender={gender}
                                currentGenders={prefs.genders}
                                onGenderChange={genders => handleUpdate({genders})}/>
                            <Text style={styles.label}>{gender.valueOf()}</Text>
                        </View>
                    )
                },
            )}
        </ViewWithTitle>

        <ViewWithTitle title="Age UserPrefences">
            <Slider
                minimumValue={18}
                maximumValue={100}
                value={[prefs.ageFrom, prefs.ageTo]}
                step={1}
                minimumTrackTintColor="#afbcf5"
                thumbTintColor="#6f7dc7"
                onValueChange={ageGap => handleUpdate({ageFrom: ageGap[0], ageTo: ageGap[1]})}/>
            <Text style={styles.ageText}>
                Selected Age Range: {prefs.ageFrom} - {prefs.ageTo}
            </Text>
        </ViewWithTitle>

        <ViewWithTitle title="Location I want to avoid">
            <TextInput
                style={styles.input}
                value={cityToAvoid}
                onChangeText={setCityToAvoid}
                placeholder="Type the city you want to avoid"
            />
        </ViewWithTitle>
    </View>;
}

type genderCheckBoxProps = {
    gender: Gender,
    currentGenders: Gender[],
    onGenderChange: (genders: Gender[]) => void
}

function GenderCheckBox(
    {
        gender,
        currentGenders,
        onGenderChange,
    }: genderCheckBoxProps) {
    const checked = currentGenders.includes(gender)
    return <CheckBox
        checked={checked}
        onPress={() => {
            onGenderChange(checked ? currentGenders.filter(g => g !== gender) : [...currentGenders, gender])
        }}
        checkedColor="#6f7dc7"
        containerStyle={styles.checkbox}
    />;
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
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
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        padding: 0,
        margin: 0,
        marginRight: 10,
        backgroundColor: "transparent",
        borderWidth: 0,
    },
    ageText: {
        fontSize: 16,
        color: "#555",
    },
})
