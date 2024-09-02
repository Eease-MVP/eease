import {Tabs} from 'expo-router';
import React from 'react';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabHeaderProps} from "@react-navigation/bottom-tabs";
import {Text} from "react-native";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <SafeAreaView style={{flex: 1}}>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                    headerShown: false,
                }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({color, focused}) => (
                            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color}/>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="health-tracking"
                    options={{
                        title: 'Health tracking',
                        tabBarIcon: ({color, focused}) => (
                            <TabBarIcon name={focused ? 'stats-chart' : 'stats-chart-outline'} color={color}/>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="connections"
                    options={{
                        title: 'Connections',
                        tabBarIcon: ({color, focused}) => (
                            <TabBarIcon name={focused ? 'git-branch' : 'git-branch-outline'} color={color}/>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({color, focused}) => (
                            <TabBarIcon name={focused ? 'person-circle' : 'person-circle-outline'} color={color}/>
                        ),
                    }}

                />
            </Tabs>
        </SafeAreaView>
    );
}
