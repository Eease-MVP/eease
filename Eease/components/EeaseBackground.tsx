import {ImageBackground, StyleSheet} from "react-native"
import {ReactNode} from "react";

const background = require("../assets/images/background.jpg")
type EeaseBackgroundProps = {
    children: ReactNode;
};

export default function EeaseBackground({children}: EeaseBackgroundProps) {
    return (
        <ImageBackground source={background} style={styles.background}>
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
