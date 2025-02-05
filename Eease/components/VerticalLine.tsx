import React from 'react'
import {StyleSheet, View} from 'react-native'

export function VerticalLine() {
    return <View style={styles.line} />
}

const styles = StyleSheet.create({
    line: {
        height: 1,
        backgroundColor: '#E5E5E5',
        width: '100%',
    },
})