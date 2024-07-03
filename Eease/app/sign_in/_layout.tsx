import React from 'react';
import {useColorScheme} from '@/hooks/useColorScheme';
import SignInUpScreen from "@/app/sign/index";
import {Stack} from "expo-router";


export default function SignLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ title: "Sign in", headerShown: false }}
            ></Stack.Screen>
        </Stack>
    )
}
