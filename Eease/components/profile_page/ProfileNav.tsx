import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ProfileNav() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.navText}>My profile</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Ionicons name="notifications-outline" size={24} color="black" style={styles.icon} />
                    <Ionicons name="settings-outline" size={24} color="black" style={styles.icon} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "#C7C7C7", 
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        width: '100%',
    },
    textContainer: {
        flex: 1,
        marginLeft: '10%',
    },
    iconContainer: {
        flexDirection: 'row',
        marginRight: '10%',
    },
    icon: {
        marginLeft: 15,
    },
    navText: {
        fontSize: 20,
    },
});
