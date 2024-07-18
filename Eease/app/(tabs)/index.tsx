import { RootState } from '@/store/user-slice';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Dashboard from '@/components/home_page/Dashboard';
import HomePageNav from '@/components/home_page/HomePageNav';
import ReceptorPreferencesDisplay from '@/components/home_page/ReceptorPreferencesDisplay';

export default function Home() {
  const user = useSelector((state: RootState) => state.user)

  return (
    <View style={styles.container}>
        <HomePageNav />
        <Dashboard />
        <ReceptorPreferencesDisplay />
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