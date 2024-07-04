import {StyleSheet, Text, TextInput, View} from "react-native";


import React from 'react'

type textInputProps = {
    title: string,
    value: string,
    onChangeValue: ((value: string) => void),
    placeholder: string,
}
export default function TextInputWithTitle({title, value, onChangeValue, placeholder}: textInputProps) {
    return (
        <View>
            <Text style={styles.label}>{title}:</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeValue}
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

