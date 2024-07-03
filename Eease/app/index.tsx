import {ActivityIndicator} from "react-native"
import EeaseBackground from "@/components/EeaseBackground"
import {useFetchUserQuery} from "@/store/user-api"
import {Redirect} from "expo-router"


export default function RedirectScreen() {
    const {data: user, error, isLoading, isSuccess, isError} = useFetchUserQuery()

    console.log('error is', error)
    if (isError) {
        if ('status' in error && error.status && typeof error.status === 'number') {
            switch (error.status) {
                case 403:
                    return <Redirect href={'/sign'}/>
                case 404: // 404 = you've logged in, but hasn't created a user yet.
                    return <Redirect href="/sign_up/createUser"/>
            }
        }
        return <Redirect href={'/sign'}/>
    }

    if (isLoading) {
        return <EeaseBackground>
            <ActivityIndicator/>
        </EeaseBackground>
    }

    if (isSuccess) {
        return user.prefs ? <Redirect href="(tabs)"/> : <Redirect href="/sign_up/ReceptorPreferences/"/>
    }
}