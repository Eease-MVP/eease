import {StyleSheet, Text, TextInput, View} from "react-native";


import React from 'react'

type textInputProps = {
    title?: string,
    value?: string,
    onChangeText: ((text: string) => void),
    placeholder: string,
}
export default function TextInputWithTitle({title, value, onChangeText, placeholder}: textInputProps) {
    return (
        <View>
            {title && <Text style={styles.label}>{title}:</Text>}
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                multiline={false}
                placeholder={placeholder}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    label: {
        fontSize: 14,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 8,
    },
});

