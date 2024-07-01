import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import UserInfo from '@/components/profile_page/UserInfo';
import UserInfoDisplay from '@/components/profile_page/UserInfoDisplay';
import ProfileNav from '@/components/profile_page/ProfileNav';
import EditPreferences from '@/components/profile_page/EditPreferences';

export default function Profile() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.navBarArea}>
        <ProfileNav />
      </SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <UserInfo />
        <UserInfoDisplay />
        <EditPreferences />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", 
  },
  navBarArea: {
    backgroundColor: "#C7C7C7", 
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
    paddingVertical: 20,
  },
});
