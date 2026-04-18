import { PropsWithChildren } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Toast } from '@/components/common/Toast';
import { UnauthorizedSessionSync } from '@/providers/UnauthorizedSessionSync';
import { StatusBar } from 'react-native';
import { queryClient } from '@/providers/queryClient';
import { theme } from '@/styles/theme';

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
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
  );
};
