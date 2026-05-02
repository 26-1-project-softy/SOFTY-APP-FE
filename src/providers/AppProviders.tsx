import type { PropsWithChildren } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Toast } from '@/components/common/Toast';
import { UnauthorizedSessionSync } from '@/providers/UnauthorizedSessionSync';
import { queryClient } from '@/providers/queryClient';
import { theme } from '@/styles/theme';

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.bg1} />
            <NavigationContainer>{children}</NavigationContainer>
            <Toast />
            <UnauthorizedSessionSync />
          </ThemeProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
