import styled from '@emotion/native';
import { Pressable } from 'react-native';
import { useTheme } from '@emotion/react';
import type { IconComponent } from '@/types/icon';

type IconButtonVariant = 'primary' | 'ghost' | 'plain';

interface IconButtonProps {
  icon: IconComponent;
  variant: IconButtonVariant;
  disabled?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
}

export const IconButton = ({
  icon: Icon,
  variant,
  disabled = false,
  onPress,
  accessibilityLabel,
}: IconButtonProps) => {
  const theme = useTheme();

  const iconColor = disabled
    ? theme.colors.text.text4
    : variant === 'primary'
      ? theme.colors.text.textW
      : theme.colors.text.text1;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      {({ pressed }) => (
        <ButtonContainer $variant={variant} $pressed={pressed} $disabled={disabled}>
          <Icon color={iconColor} />
        </ButtonContainer>
      )}
    </Pressable>
  );
};

const ButtonContainer = styled.View<{
  $variant: IconButtonVariant;
  $pressed: boolean;
  $disabled: boolean;
}>(({ theme, $variant, $pressed, $disabled }) => ({
  width: 40,
  height: 40,
  borderRadius: 999,
  borderWidth: $variant === 'ghost' ? 1 : 0,
  borderColor: $variant === 'ghost' ? theme.colors.border.border1 : 'transparent',
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: $disabled
    ? theme.colors.background.bg1
    : $pressed && $variant !== 'primary'
      ? theme.colors.background.bg5
      : $variant === 'primary'
        ? theme.colors.brand.primary
        : $variant === 'ghost'
          ? theme.colors.background.bg1
          : 'transparent',
  opacity: $pressed && !$disabled && $variant === 'primary' ? 0.85 : 1,
}));
