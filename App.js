// Gerekli Expo ve güvenli alan bileşenleri
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Başlangıç ekranı bileşeni
import BaslangicEkrani from './kaynak/ekranlar/BaslangicEkrani';

// Ana Uygulama Bileşeni
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <BaslangicEkrani />
    </SafeAreaProvider>
  );
}
