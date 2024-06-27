import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';

export default function EditPreferences() {

    return (
        <View style={styles.container}>
            <View style={styles.preferenceContainer}></View>
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
    }
});
