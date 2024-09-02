import React from 'react'
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import UserInfoCard from '@/components/profile/UserInfoCard'
import UserPreferencesCard from '@/components/profile/UserPreferencesCard'
import VerticalLine from "@/components/VerticalLine"

export default function Profile() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <VerticalLine/>
            <ScrollView contentContainerStyle={styles.scroll}>
                <UserInfoCard/>
                <UserPreferencesCard/>
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    scroll: {
        backgroundColor: '#fff',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        paddingHorizontal: 8,
        paddingVertical: 24,
    },
    title: {
        fontSize: 24,
        padding: 16,
        fontWeight: "bold",
        width: '80%',
        color: "#6c7abe",
    },
})
