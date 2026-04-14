import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthNavigator } from '@/navigation/AuthNavigator';
import { MainNavigator } from '@/navigation/MainNavigator';
import type { RootStackParamList } from '@/types/navigation';
import { defaultStackScreenOptions } from '@/navigation/navigationOptions';
import { ROOT_ROUTES } from '@/navigation/routes';
import { useAuthStore } from '@/stores/authStore';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const authStatus = useAuthStore(state => state.authStatus);
  const isSignedIn = authStatus === 'SIGNED_IN';

  return (
    <Stack.Navigator screenOptions={defaultStackScreenOptions}>
      {isSignedIn ? (
        <Stack.Screen name={ROOT_ROUTES.MAIN} component={MainNavigator} />
      ) : (
        <Stack.Screen name={ROOT_ROUTES.AUTH} component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};
