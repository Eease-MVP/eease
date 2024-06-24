import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ProfileNav() {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.navText}>My profile</Text>
            </View>
            <View style={styles.iconContainer}>
                <Ionicons name="notifications-outline" size={24} color="black" style={styles.icon} />
                <Ionicons name="settings-outline" size={24} color="black" style={styles.icon} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center", 
        backgroundColor: "#C7C7C7",
        width: "100%",
        padding: 10,
        borderRadius: 15,
        justifyContent: "space-between"
    },
    textContainer: {
        flex: 1,
        marginLeft: "10%"
    },
    iconContainer: {
        flexDirection: "row",
        marginRight: "10%"
    },
    icon: {
        marginLeft: 10,
    },
    navText: {
        fontSize: 20
    }
});
