import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '@/screens/LoginScreen';
import { SignUpScreen } from '@/screens/SignUpScreen';
import type { AuthStackParamList } from '@/types/navigation';
import type { AuthStatus } from '@/stores/authStore';
import { defaultStackScreenOptions } from '@/navigation/navigationOptions';
import { AUTH_ROUTES } from '@/navigation/routes';

const Stack = createNativeStackNavigator<AuthStackParamList>();

type AuthNavigatorProps = {
  authStatus: AuthStatus;
};

export const AuthNavigator = ({ authStatus }: AuthNavigatorProps) => {
  return (
    <Stack.Navigator screenOptions={defaultStackScreenOptions}>
      {authStatus === 'SIGNUP_REQUIRED' ? (
        <Stack.Screen name={AUTH_ROUTES.SIGNUP} component={SignUpScreen} />
      ) : (
        <Stack.Screen name={AUTH_ROUTES.LOGIN} component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};
