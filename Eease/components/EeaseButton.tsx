import {GestureResponderEvent, Pressable, StyleProp, StyleSheet, Text, TextStyle, ViewStyle} from "react-native";


type EeaseButtonProps = {
    onPress: ((event: GestureResponderEvent) => void) | null | undefined
    title: string
    buttonStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
}

export default function EeaseButton({onPress, title, buttonStyle, textStyle}: EeaseButtonProps) {
    return (
        <Pressable
            style={({pressed}) => [
                styles.button,
                buttonStyle,
                pressed && styles.buttonPressed, // Apply dynamic style when pressed
            ]}
            onPress={onPress}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#afbcf5',

    },
    buttonPressed: {
        backgroundColor: '#6d85f8',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
})

