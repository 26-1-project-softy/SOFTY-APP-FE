export const ROOT_ROUTES = {
  AUTH: 'Auth',
  MAIN: 'Main',
} as const;

export const AUTH_ROUTES = {
  LOGIN: 'Login',
  SIGNUP: 'SignUp',
} as const;

export const MAIN_ROUTES = {
  THREAD_LIST: 'ThreadList',
  THREAD_DETAIL: 'ThreadDetail',
  NEW_INQUIRY: 'NewInquiry',
  SETTINGS: 'Settings',
} as const;
