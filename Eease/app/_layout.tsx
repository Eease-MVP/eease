import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack, useRouter} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';

import {useColorScheme} from '@/hooks/useColorScheme';
import {SelectProvider} from "@mobile-reality/react-native-select-pro";
import SignInUpScreen from "@/app/sign";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
            /* // uncomment to see SignInUpScreen
             if (true) {
                 router.replace('sign');
             }*/
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <SelectProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                    <Stack.Screen name="+not-found"/>
                    <Stack.Screen name="sign" options={{headerShown: false}}/>
                    <Stack.Screen name="sign_up" options={{title: "Sign Up"}}/>
                </Stack>
            </ThemeProvider>
        </SelectProvider>
    );
}
