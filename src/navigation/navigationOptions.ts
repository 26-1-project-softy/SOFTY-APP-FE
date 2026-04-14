import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { theme } from '@/styles/theme';

const DEFAULT_BG_COLOR = theme.colors.background.bg2;

export const defaultStackScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_right',
  contentStyle: {
    backgroundColor: DEFAULT_BG_COLOR,
  },
};
