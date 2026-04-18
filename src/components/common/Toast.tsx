import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { useEffect, useRef } from 'react';
import { Animated, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToastStore, type ToastItem } from '@/stores/toastStore';
import { IcCheck, IcError } from '@/assets/icons';

const ToastCardItem = ({ toast, onPress }: { toast: ToastItem; onPress: () => void }) => {
  const theme = useTheme();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const Icon = toast.type === 'success' ? IcCheck : IcError;
  const iconColor =
    toast.type === 'success' ? theme.colors.semantic.success : theme.colors.semantic.error;

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }],
      }}
    >
      <ToastCardButton
        $toastType={toast.type}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={toast.message}
        android_ripple={{ color: 'rgba(0, 0, 0, 0.06)' }}
        style={({ pressed }) => ({
          opacity: pressed ? 0.96 : 1,
          transform: [{ translateY: pressed ? 0 : -1 }],
        })}
      >
        <Icon width={18} height={18} color={iconColor} />

        <ToastContent numberOfLines={2}>{toast.message}</ToastContent>
      </ToastCardButton>
    </Animated.View>
  );
};

export const Toast = () => {
  const insets = useSafeAreaInsets();
  const toasts = useToastStore(state => state.toasts);
  const removeToast = useToastStore(state => state.removeToast);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <ToastOverlay pointerEvents="box-none" $bottom={insets.bottom + 16}>
      {toasts.map(toast => (
        <ToastCardItem key={toast.id} toast={toast} onPress={() => removeToast(toast.id)} />
      ))}
    </ToastOverlay>
  );
};

const ToastOverlay = styled.View<{
  $bottom: number;
}>(({ $bottom }) => ({
  position: 'absolute',
  bottom: $bottom,
  left: 16,
  right: 16,
  zIndex: 9999,
  flexDirection: 'column-reverse',
  alignItems: 'center',
  gap: 12,
}));

const ToastCardButton = styled(Pressable)<{
  $toastType: ToastItem['type'];
}>(({ theme, $toastType }) => ({
  width: '100%',
  maxWidth: 360,
  alignSelf: 'center',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  borderRadius: 10,
  borderWidth: 1,
  borderColor:
    $toastType === 'success' ? theme.colors.semantic.success : theme.colors.semantic.error,
  backgroundColor:
    $toastType === 'success' ? theme.colors.semantic.successSoft : theme.colors.semantic.errorSoft,
  padding: 8,
  shadowColor: '#000000',
  shadowOpacity: 0.08,
  shadowRadius: 20,
  shadowOffset: {
    width: 0,
    height: 8,
  },
  elevation: 4,
}));

const ToastContent = styled.Text(({ theme }) => ({
  ...theme.fonts.body3,
  color: theme.colors.text.text1,
  flexShrink: 1,
}));
