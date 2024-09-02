import {StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle} from "react-native";
import React, {PropsWithChildren} from "react";

type ViewWithTitleProps = PropsWithChildren<{
    title: string;
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
}>

export  default function ViewWithTitle({children, title, style, textStyle}: ViewWithTitleProps) {
    return (
        <View style={[styles.container, style]}>
            <Text style={[styles.title, textStyle]}>{title}</Text>
            {children}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        gap: 8,
    },
    title: {
        alignItems: "center",
        fontSize: 22,
        fontWeight: "bold",
        justifyContent: "center",
        textAlign: "left",
        color: "#6B5959DD",
        padding: 8,
    },
})