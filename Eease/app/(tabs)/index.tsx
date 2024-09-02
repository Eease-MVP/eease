import React from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import Dashboard from '@/components/home_page/Dashboard'
import HomePageNav from '@/components/home_page/HomePageNav'
import ReceptorPreferencesDisplay from '@/components/home_page/ReceptorPreferencesDisplay'
import ExploreReceptors from '@/components/home_page/ExploreReceptors'

export default function HomeTab() {

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <HomePageNav/>
            <View style={{gap: 24, paddingHorizontal: 24}}>
                <Dashboard/>
                <ReceptorPreferencesDisplay/>
            </View>
            <ExploreReceptors/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        alignItems: 'center',
        paddingVertical: 24,
        gap: 24,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
})