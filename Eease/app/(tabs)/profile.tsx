import { View, Text, StyleSheet, ScrollView } from 'react-native';
import UserInfo from '@/components/profile_page/UserInfo';
import UserInfoDisplay from '@/components/profile_page/UserInfoDisplay';
import ProfileNav from '@/components/profile_page/ProfileNav';
import EditPreferences from '@/components/profile_page/EditPreferences';

export default function Profile() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ProfileNav />
      <UserInfo />
      <UserInfoDisplay />
      <EditPreferences />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
    paddingVertical: 20, 
  },
});
