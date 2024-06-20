import { View, Text, StyleSheet } from 'react-native';
import UserInfo from '@/components/profile_page/UserInfo';
import UserInfoDisplay from '@/components/profile_page/UserInfoDisplay';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View>
        <UserInfo />
        <UserInfoDisplay />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  }
})