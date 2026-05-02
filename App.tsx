import 'react-native-reanimated';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { RootNavigator } from '@/navigation/RootNavigator';
import { AppProviders } from '@/providers/AppProviders';
import { setUnauthorizedHandler, setupApiInterceptors } from '@/services/http';
import { useAuthStore } from '@/stores/authStore';

void SplashScreen.preventAutoHideAsync();

const App = () => {
  const clearSession = useAuthStore(state => state.clearSession);

  const [loaded, error] = useFonts({
    PretendardRegular: require('@/assets/fonts/Pretendard-Regular.otf'),
    PretendardSemiBold: require('@/assets/fonts/Pretendard-SemiBold.otf'),
    PretendardBold: require('@/assets/fonts/Pretendard-Bold.otf'),
    PretendardBlack: require('@/assets/fonts/Pretendard-Black.otf'),
  });

  useEffect(() => {
    setupApiInterceptors();
    setUnauthorizedHandler(() => {
      clearSession();
    });

    return () => {
      setUnauthorizedHandler(null);
    };
  }, [clearSession]);

  useEffect(() => {
    if (loaded || error) {
      void SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
};

export default App;
