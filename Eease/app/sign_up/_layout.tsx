import React from "react"
import {Stack} from "expo-router"

export default function SignLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{title: "Profile", headerShown: false}}/>
        </Stack>
    )
}
