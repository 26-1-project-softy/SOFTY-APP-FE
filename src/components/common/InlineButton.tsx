import styled from '@emotion/native';
import { Pressable, type DimensionValue } from 'react-native';
import { useTheme } from '@emotion/react';
import type { IconComponent } from '@/types/icon';

type ButtonSize = 'M' | 'L';
type ButtonVariant = 'primary' | 'ghost' | 'text';

interface InlineButtonProps {
  variant: ButtonVariant;
  size: ButtonSize;
  label: string;
  bgColor?: string;
  color?: string;
  icon?: IconComponent;
  width?: DimensionValue;
  disabled?: boolean;
  onPress?: () => void;
}

export const InlineButton = ({
  variant,
  size,
  label,
  bgColor,
  color,
  icon: Icon,
  width,
  disabled = false,
  onPress,
}: InlineButtonProps) => {
  const theme = useTheme();

  const contentColor = disabled
    ? theme.colors.text.text4
    : color
      ? color
      : variant === 'primary'
        ? theme.colors.text.textW
        : theme.colors.text.text1;

  return (
    <Pressable onPress={onPress} disabled={disabled} accessibilityRole="button">
      {({ pressed }) => (
        <ButtonContainer
          $size={size}
          $width={width}
          $variant={variant}
          $pressed={pressed}
          $disabled={disabled}
          $bgColor={bgColor}
        >
          {Icon && <Icon color={contentColor} />}
          <ButtonLabel style={{ color: contentColor }}>{label}</ButtonLabel>
        </ButtonContainer>
      )}
    </Pressable>
  );
};

const ButtonContainer = styled.View<{
  $size: ButtonSize;
  $width?: DimensionValue;
  $variant: ButtonVariant;
  $pressed: boolean;
  $disabled: boolean;
  $bgColor?: string;
}>(({ theme, $size, $width, $variant, $pressed, $disabled, $bgColor }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
  width: $width,
  height: $size === 'M' ? 34 : 42,
  borderRadius: 10,
  paddingHorizontal: 12,
  overflow: 'hidden',
  backgroundColor: $disabled
    ? theme.colors.background.bg5
    : $pressed && $variant !== 'primary'
      ? theme.colors.background.bg5
      : $bgColor
        ? $bgColor
        : $variant === 'primary'
          ? theme.colors.brand.primary
          : $variant === 'ghost'
            ? theme.colors.background.bg1
            : 'transparent',
  borderWidth: $variant === 'ghost' ? 1 : 0,
  borderColor: $variant === 'ghost' ? theme.colors.border.border1 : 'transparent',
  opacity: $pressed && !$disabled && $variant !== 'text' ? 0.85 : 1,
}));

const ButtonLabel = styled.Text(({ theme }) => ({
  ...theme.fonts.labelXS,
}));
