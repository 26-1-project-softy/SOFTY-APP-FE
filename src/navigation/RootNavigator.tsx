import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { AuthNavigator } from '@/navigation/AuthNavigator';
import { MainNavigator } from '@/navigation/MainNavigator';
import type { RootStackParamList } from '@/types/navigation';
import { defaultStackScreenOptions } from '@/navigation/navigationOptions';
import { ROOT_ROUTES } from '@/navigation/routes';
import { useAuthStore } from '@/stores/authStore';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const authStatus = useAuthStore(state => state.authStatus);
  const activeRole = useAuthStore(state => state.activeRole);
  const clearSession = useAuthStore(state => state.clearSession);

  const isSignedInParent = authStatus === 'SIGNED_IN' && activeRole === 'PARENT';
  const shouldClearInvalidSignedInSession = authStatus === 'SIGNED_IN' && activeRole !== 'PARENT';

  useEffect(() => {
    if (shouldClearInvalidSignedInSession) {
      clearSession();
    }
  }, [shouldClearInvalidSignedInSession, clearSession]);

  return (
    <Stack.Navigator screenOptions={defaultStackScreenOptions}>
      {isSignedInParent ? (
        <Stack.Screen name={ROOT_ROUTES.MAIN} component={MainNavigator} />
      ) : (
        <Stack.Screen name={ROOT_ROUTES.AUTH} navigationKey={authStatus}>
          {() => <AuthNavigator authStatus={authStatus} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
};
