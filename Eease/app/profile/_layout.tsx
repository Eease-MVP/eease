import React from "react"
import {Stack} from "expo-router"
import {SafeAreaView} from 'react-native-safe-area-context';

export default function ProfileLayout() {
    return (
        <SafeAreaView style={styles.container}>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{title: "Profile", headerShown: false}}/>
                <Stack.Screen
                    name="TermsPage"
                    options={{title: "Terms and conditions", headerShown: false}}/>
                <Stack.Screen
                    name="ReceptorPreferences"
                    options={{title: "Receptor UserPrefences", headerShown: false}}/>
            </Stack>
        </SafeAreaView>
    )
}

const styles = {
    container: {
        flex: 1,
    },
}