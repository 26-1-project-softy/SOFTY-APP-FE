import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NewInquiryScreen } from '@/screens/NewInquiryScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { ThreadDetailScreen } from '@/screens/ThreadDetailScreen';
import { ThreadListScreen } from '@/screens/ThreadListScreen';
import type { MainStackParamList } from '@/types/navigation';
import { defaultStackScreenOptions } from '@/navigation/navigationOptions';
import { MAIN_ROUTES } from '@/navigation/routes';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={MAIN_ROUTES.THREAD_LIST}
      screenOptions={defaultStackScreenOptions}
    >
      <Stack.Screen name={MAIN_ROUTES.THREAD_LIST} component={ThreadListScreen} />
      <Stack.Screen name={MAIN_ROUTES.THREAD_DETAIL} component={ThreadDetailScreen} />
      <Stack.Screen name={MAIN_ROUTES.NEW_INQUIRY} component={NewInquiryScreen} />
      <Stack.Screen name={MAIN_ROUTES.SETTINGS} component={SettingsScreen} />
    </Stack.Navigator>
  );
};
