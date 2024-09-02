import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ProfileNav() {
    return (
            <View style={styles.container}>
              <Text style={styles.navText}>My profile</Text>
                <View style={styles.iconContainer}>
                    <Ionicons name="notifications-outline" size={24} color="black" style={styles.icon} />
                    <Ionicons name="settings-outline" size={24} color="black" style={styles.icon} />
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#C7C7C7",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        width: '100%',
    },
    iconContainer: {
        flexDirection: 'row',
    },
    icon: {
        marginHorizontal: 8,
    },
    navText: {
        fontSize: 20,
    },
});
