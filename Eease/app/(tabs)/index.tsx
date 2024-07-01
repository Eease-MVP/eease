import { RootState } from '@/store/user-slice';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Dashboard from '@/components/home_page/dashboard';
import HomePageNav from '@/components/home_page/homePageNav';

export default function Home() {
  const user = useSelector((state: RootState) => state.user)

  return (
    <View style={styles.container}>
        <HomePageNav />
        <Dashboard />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 40,
    backgroundColor: "white"
  }
})