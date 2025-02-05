import React from 'react'
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native'

interface EeaseButtonProps {
    title: string
    onPress: () => void | Promise<void>
    buttonStyle?: ViewStyle
}

export function EeaseButton({title, onPress, buttonStyle}: EeaseButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.button, buttonStyle]}
            onPress={onPress}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#ff899a',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
})

