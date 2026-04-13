import styled from '@emotion/native';
import { Pressable } from 'react-native';
import { IconComponent } from '@/types/icon';

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
  return (
    <ButtonContainer
      $variant={variant}
      disabled={disabled}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      android_ripple={{ color: 'rgba(0, 0, 0, 0.08)', radius: 26 }}
      style={({ pressed }) => ({
        opacity: pressed && !disabled ? 0.88 : 1,
      })}
    >
      <Icon width={24} height={24} color={getIconColor(variant, disabled)} />
    </ButtonContainer>
  );
};

const getIconColor = (variant: IconButtonVariant, disabled: boolean) => {
  if (disabled) return '#808080';
  if (variant === 'primary') return '#FFFFFF';
  return '#000000';
};

const ButtonContainer = styled(Pressable)<{
  $variant: IconButtonVariant;
  disabled: boolean;
}>(({ theme, $variant, disabled }) => ({
  width: 40,
  height: 40,
  borderRadius: 999,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor:
    $variant === 'plain'
      ? 'transparent'
      : disabled
        ? theme.colors.background.bg1
        : $variant === 'primary'
          ? theme.colors.brand.primary
          : $variant === 'ghost'
            ? theme.colors.background.bg1
            : 'transparent',
}));
