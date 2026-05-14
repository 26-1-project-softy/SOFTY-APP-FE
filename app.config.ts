import 'dotenv/config';
import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: '소프티',
  scheme: 'softy',
  slug: 'softy-parent',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    runtimeVersion: {
      policy: 'appVersion',
    },
  },
  updates: {
    url: 'https://u.expo.dev/e05325b4-ef41-423c-921e-712d2d1b0631',
  },
  android: {
    package: 'com.softy.parent',
    softwareKeyboardLayoutMode: 'resize',
    runtimeVersion: '1.0.0',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    'expo-font',
    [
      '@react-native-seoul/kakao-login',
      {
        kakaoAppKey: process.env.KAKAO_NATIVE_APP_KEY,
        kotlinVersion: '2.1.20',
      },
    ],
    [
      'expo-build-properties',
      {
        android: {
          extraMavenRepos: ['https://devrepo.kakao.com/nexus/content/groups/public/'],
        },
      },
    ],
    [
      'expo-splash-screen',
      {
        image: './assets/splash-icon.png',
        backgroundColor: '#FFFFFF',
        imageWidth: 200,
        resizeMode: 'contain',
      },
    ],
  ],
  extra: {
    eas: {
      projectId: 'e05325b4-ef41-423c-921e-712d2d1b0631',
    },
  },
};

export default config;
