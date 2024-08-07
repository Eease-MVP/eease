import { ActivityIndicator } from "react-native"
import EeaseBackground from "@/components/EeaseBackground"
import { useFetchUserQuery } from "@/store/user-api"
import { Redirect } from "expo-router"


export default function RedirectScreen() {
    const { data: user, error, isLoading, isSuccess, isError } = useFetchUserQuery()

    if (isError) {
        if ('status' in error && error.status && typeof error.status === 'number') {
            switch (error.status) {
                case 403:
                    console.log("Error 403: you need to sign in or up")
                    return <Redirect href={'/sign'} />
                case 404:
                    console.log("Error 404: you've singed in, but haven't created a user yet")
                    return <Redirect href="/sign_up/createUser" />
            }
        }
        return <Redirect href={'/sign'} />
    }

    if (isLoading) {
        return <EeaseBackground>
            <ActivityIndicator />
        </EeaseBackground>
    }

    if (isSuccess) {
        return user.prefs ? <Redirect href="(tabs)" /> : <Redirect href="/sign_up/ReceptorPreferences/" />
    }
}