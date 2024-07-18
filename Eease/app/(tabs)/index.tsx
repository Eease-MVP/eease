import React from 'react';
import { RootState } from '@/store/user-slice';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Dashboard from '@/components/home_page/Dashboard';
import HomePageNav from '@/components/home_page/HomePageNav';
import ReceptorPreferencesDisplay from '@/components/home_page/ReceptorPreferencesDisplay';
import ExploreReceptors from '@/components/home_page/ExploreReceptors';

export default function Home() {
  const user = useSelector((state: RootState) => state.user)

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <HomePageNav />
        <Dashboard />
        <ReceptorPreferencesDisplay />
        <ExploreReceptors />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 40,
    backgroundColor: 'white',
  },
});
