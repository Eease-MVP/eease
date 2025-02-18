import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HomePageNav() {

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Logo</Text>
            </View>
            <View style={styles.iconContainer}>
                <Ionicons name="notifications-outline" size={24} color="black"/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "70%",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 25,
    },
    logoContainer: {
        alignItems: 'center',
        backgroundColor: "#ECECEC",
        borderRadius: 15,
        marginLeft: "auto",
        padding: 10,
        width: "50%",
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    iconContainer: {
        backgroundColor: "#ECECEC",
        borderRadius: 100,
        padding: 10,
        marginLeft: "10%",
    },
})
