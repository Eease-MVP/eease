import {PropsWithChildren} from "react";
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";


type CardProps = PropsWithChildren<{
    style?: StyleProp<ViewStyle>
}>

export function EeasyCard({children, style}: CardProps) {
    return (
        <View style={[styles.card, style]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        paddingHorizontal: 16,
        paddingVertical: 32,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
});