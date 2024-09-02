import {ImageBackground, StyleProp, StyleSheet, ViewStyle} from "react-native"
import {PropsWithChildren, ReactNode} from "react";

const background = require("../assets/images/background.jpg")
type EeaseBackgroundProps = PropsWithChildren<{
    style?: StyleProp<ViewStyle>
}>

export default function EeaseBackground({children, style}: EeaseBackgroundProps) {
    return (
        <ImageBackground source={background} style={[styles.background, style]}>
            {children}
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
    },
})
