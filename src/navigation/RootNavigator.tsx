import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthNavigator } from '@/navigation/AuthNavigator';
import { MainNavigator } from '@/navigation/MainNavigator';
import type { RootStackParamList } from '@/types/navigation';
import { defaultStackScreenOptions } from '@/navigation/navigationOptions';
import { ROOT_ROUTES } from '@/navigation/routes';
import { useAuthStore } from '@/stores/useAuthStore';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Stack.Navigator screenOptions={defaultStackScreenOptions}>
      {isAuthenticated ? (
        <Stack.Screen name={ROOT_ROUTES.MAIN} component={MainNavigator} />
      ) : (
        <Stack.Screen name={ROOT_ROUTES.AUTH} component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};
