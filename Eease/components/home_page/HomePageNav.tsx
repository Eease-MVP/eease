import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/user-slice';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HomePageNav() {
    const user = useSelector((state: RootState) => state.user);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>Logo</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        width: "100%",
    },
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
        backgroundColor: "#C7C7C7", 
        borderRadius: 15,
        marginLeft: "auto",
        padding: 10,
        width: "50%"
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    iconContainer: {
        backgroundColor: "#C7C7C7",
        borderRadius: 100,
        padding: 10,
        marginLeft: "10%"
    }
});
