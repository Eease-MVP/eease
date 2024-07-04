import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native"
import {useFonts} from "expo-font"
import {Stack} from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import {useEffect} from "react"
import "react-native-reanimated"

import {SelectProvider} from "@mobile-reality/react-native-select-pro"
import {useColorScheme} from "@/hooks/useColorScheme"

import ReduxProvider from "../store/store"

export const unstable_settings = {initialRouteName: "sign/index"}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const colorScheme = useColorScheme()
    const [fontLoaded] = useFonts({SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf")})

    useEffect(() => {
        if (fontLoaded) SplashScreen.hideAsync()
    }, [fontLoaded])

    if (!fontLoaded) return null

    return (
        <ReduxProvider>
            <SelectProvider>
                <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
                    <Stack initialRouteName="index">
                        <Stack.Screen name="index" options={{headerShown: false}}/>
                        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                        <Stack.Screen name="+not-found"/>
                        <Stack.Screen name="sign" options={{headerShown: false}}/>
                        <Stack.Screen name="sign_in" options={{headerShown: false}}/>
                        <Stack.Screen name="sign_up" options={{headerShown: false}}/>
                        <Stack.Screen name="payment_ui/PaymentScreen" options={{title: "Payment"}}/>
                    </Stack>
                </ThemeProvider>
            </SelectProvider>
        </ReduxProvider>
    )
}
