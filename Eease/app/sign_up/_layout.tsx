import React from "react"
import SignUpScreen from "@/app/sign_up/index"
import { Stack } from "expo-router"

export default function SignLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="termsPage"
        options={{ title: "Terms and conditions", headerShown: false }}
      ></Stack.Screen>
    </Stack>
  )
}
