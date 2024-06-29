import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';

export default function EditPreferences() {

    let dummyData = {
        fromAge: 18,
        toAge: 22,
        cityToAvoid: ["Stockholm, Malmö"],
        genders: ["Male"]
    }

    return (
        <View style={styles.container}>
            <Text style={styles.containerTitle}>My preferences</Text>
            <View>
                <Text style={styles.userPreferencesDisplay}>Chosen age gap: {dummyData.fromAge} - {dummyData.toAge}</Text>
                <Text style={styles.userPreferencesDisplay}>Avoid city: {dummyData.cityToAvoid}</Text>
                <Text style={styles.userPreferencesDisplay}>Chosen gender/s: {dummyData.genders}</Text>
            </View>
            <View>
                <Text style={styles.editPreferenceText}>Edit my preferences</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#C7C7C7",
        borderRadius: 15,
        padding: 15,
        width: "80%",
        alignSelf: 'center'
    },
    editPreferenceText: {
        textAlign: "center",
        textDecorationLine: "underline",
        marginTop: 20
    },
    containerTitle: {
        textAlign: "center",
        fontSize: 25,
        marginBottom: 20
    },
    userPreferencesDisplay: {
        padding: 5,
        fontSize: 16
    },
});
