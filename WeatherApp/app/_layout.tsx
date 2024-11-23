import { Slot } from 'expo-router';
import { WeatherProvider } from '@/hooks/WeatherContext';

export default function Layout() {
  return (
    <WeatherProvider>
      <Slot />
    </WeatherProvider>
  );
}
