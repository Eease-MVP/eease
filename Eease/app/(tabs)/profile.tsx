import { View, Text, StyleSheet } from 'react-native';
import UserInfo from '@/components/profile_page/UserInfo';
import UserInfoDisplay from '@/components/profile_page/UserInfoDisplay';

export default function Profile() {
  return (
    <View style={styles.container}>
        <UserInfo />
        <UserInfoDisplay />
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