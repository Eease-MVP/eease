import React from "react"
import {Stack} from "expo-router"

export default function SignLayout() {
    return (
        <Stack><Stack.Screen
            name="index"
            options={{title: "Profile"}}/>
            <Stack.Screen
                name="termsPage"
                options={{title: "Terms and conditions", headerShown: false}}/>
            <Stack.Screen
                name="ReceptorPreferences"
                options={{title: "Receptor Preferences"}}/>
        </Stack>
    )
}
