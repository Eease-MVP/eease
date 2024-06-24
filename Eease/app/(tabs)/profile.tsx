import { View, Text, StyleSheet } from 'react-native';
import UserInfo from '@/components/profile_page/UserInfo';
import UserInfoDisplay from '@/components/profile_page/UserInfoDisplay';
import ProfileNav from '@/components/profile_page/ProfileNav';
import EditPreferences from '@/components/profile_page/EditPreferences';

export default function Profile() {
  return (
    <View style={styles.container}>
        <ProfileNav />
        <UserInfo />
        <UserInfoDisplay />
        <EditPreferences />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  }
})