import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/user-slice';

export default function Dashboard() {
    const user = useSelector((state: RootState) => state.user);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    <View style={styles.profilePic}></View>
                    <View>
                        <Text style={styles.welcomeText}>Welcome</Text>
                        <Text>{user.username}!</Text>
                    </View>
                </View>
                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>Set status</Text>
                    <View style={styles.status}></View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        width: "100%"
    },
    container: {
        backgroundColor: "#C7C7C7", 
        alignItems: 'center',
        padding: 20,
        width: "70%",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 25
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25, 
        backgroundColor: "#A4A4A4",
        marginRight: 10, 
    },
    welcomeText: {
        fontSize: 20,
        textAlign: "center"
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: "#A4A4A4",
        borderRadius: 50,
        padding: 15
    },
    status: {
        width: 50,
        height: 50,
        borderRadius: 25, 
        backgroundColor: "green",
        marginLeft: 20
    },
    statusText: {
        fontSize: 20
    }
});
