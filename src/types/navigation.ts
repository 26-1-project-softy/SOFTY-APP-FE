import type { NavigatorScreenParams } from '@react-navigation/native';
import { AUTH_ROUTES, MAIN_ROUTES, ROOT_ROUTES } from '@/navigation/routes';

export type AuthStackParamList = {
  [AUTH_ROUTES.LOGIN]: undefined;
  [AUTH_ROUTES.SIGNUP]: undefined;
};

export type MainStackParamList = {
  [MAIN_ROUTES.THREAD_LIST]: undefined;
  [MAIN_ROUTES.THREAD_DETAIL]: {
    threadId: string;
  };
  [MAIN_ROUTES.NEW_INQUIRY]: undefined;
  [MAIN_ROUTES.SETTINGS]: undefined;
};

export type RootStackParamList = {
  [ROOT_ROUTES.AUTH]: NavigatorScreenParams<AuthStackParamList>;
  [ROOT_ROUTES.MAIN]: NavigatorScreenParams<MainStackParamList>;
};
