import {StyleSheet, Text, View} from "react-native";

export function TextWithTitle({title, text}: { title: string, text?: string }) {
    return (
        <View style={styles.row}>
            <Text>
                <Text style={styles.title}>{title}</Text>{text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    title: {
        fontWeight: 'bold',
    },
})