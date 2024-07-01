import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import "react-native-reanimated"

import { SelectProvider } from "@mobile-reality/react-native-select-pro"
import SignInUpScreen from "@/app/sign"
import PreferencesLayout from "./preferences/_layout"
import PaymentScreen from "./payment_ui/PaymentScreen"
import { useColorScheme } from "@/hooks/useColorScheme"
import { useRouter } from "expo-router"

import ReduxProvider from "../store/store"

export const unstable_settings = {
  initialRouteName: "sign/index",
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  })
  const router = useRouter()

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().then(()=>{
      // Uncomment to see SignInUpScreen
      
        router.replace("sign")
      })
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ReduxProvider>
      <SelectProvider>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack initialRouteName="sign/index">
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="sign" options={{ headerShown: false }} />
            <Stack.Screen name="sign_up" options={{ title: "Sign Up" }} />
            <Stack.Screen name="sign_up/ReceptorPreferences"  options={{ title: "Receptor Preferences" }} />
            <Stack.Screen name="payment_ui/PaymentScreen" options={{ title:"Payment" }}/>
          </Stack>
        </ThemeProvider>
      </SelectProvider>
    </ReduxProvider>
  )
}
