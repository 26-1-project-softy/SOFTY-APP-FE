import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const defaultStackScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_right',
  contentStyle: {
    backgroundColor: 'transparent',
  },
};
