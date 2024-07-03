import {StyleSheet, Text, View} from 'react-native';
import {useFetchUserQuery} from "@/store/user-api";
import {useEffect} from "react";

export default function Home() {
    const {data: user, error: fetchError, isLoading: isFetching} = useFetchUserQuery()

    useEffect(() => console.log("user is ", user, "error is ", fetchError), [])
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            <Text>Hi, {user?.name}!</Text>
            <Text>Your birthday is {user?.birthDate}!</Text>
            <Text>More info: {JSON.stringify(user)}!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
})