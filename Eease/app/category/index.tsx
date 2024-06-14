import { View, Text } from 'react-native'
import {Link } from 'expo-router'
import React from 'react'
import ColorList from '@/components/category/ColorList'


const Home = () => {
    return (
        <View>
            < ColorList color='#888888' />
            <p>Addictions</p>
            <p>Anxiety</p>
            <p>Alone</p>
            <p>Disorder</p>

        </View>
    )
}

export default Home