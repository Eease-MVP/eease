import { RootState } from '@/store/user-slice';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function Home() {
  const user = useSelector((state: RootState) => state.user)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text>Hi, {user.username}!</Text>
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