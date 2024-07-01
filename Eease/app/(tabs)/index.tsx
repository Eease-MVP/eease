import { RootState } from '@/store/user-slice';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Dashboard from '@/components/home_page/dashboard';

export default function Home() {
  const user = useSelector((state: RootState) => state.user)

  return (
    <View style={styles.container}>
      <Dashboard />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})