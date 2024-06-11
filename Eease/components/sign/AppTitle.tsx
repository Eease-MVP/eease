import {StyleSheet, Text, View} from "react-native";

export default function AppTitle() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>eease</Text>
            <Text style={styles.body}>your chest | your mind</Text>
        </View>)
}


const styles = StyleSheet.create({
    container: {},
    title: {
        fontSize: 66,
        fontWeight: 'bold',
        color: '#fff',
        margin: 0,
    },
    body: {
        fontSize: 16,
        color: '#fff',
    },
})