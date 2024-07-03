import {StyleSheet, Text, View} from 'react-native';
import {useFetchUserQuery} from "@/store/user-api";

export default function Home() {
    const {data: user, error: fetchError, isLoading: isFetching, refetch} = useFetchUserQuery()

    return (
        // testing
        <View style={styles.container}>
            <Text style={styles.title}>Hi, {user?.name}!</Text>
            <Text style={styles.title}>Your birthday is {user?.birthDate}!</Text>
            <Text style={styles.title}>Your gender is {user?.gender}.</Text>
            <Text style={styles.title}>You speak following languages: {user?.languages.join(", ")}!</Text>

            <Text style={styles.title}>According to your preferences you'd like to talk to someone
                who is {user?.prefs?.genders.join(", ")} and is between {user?.prefs?.ageFrom} and {user?.prefs?.ageTo} years old!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 32,
        gap: 8,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
    },
})