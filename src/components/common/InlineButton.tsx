import styled from '@emotion/native';
import { Pressable, type DimensionValue, type PressableProps } from 'react-native';
import { useTheme } from '@emotion/react';
import { getButtonBackgroundColor } from '@/utils/getButtonBackgroundColor';
import type { IconComponent } from '@/types/icon';

type ButtonSize = 'M' | 'L';
type ButtonVariant = 'primary' | 'ghost' | 'text';

type InlineButtonProps = {
  variant: ButtonVariant;
  size: ButtonSize;
  label: string;
  bgColor?: string;
  activeBgColor?: string;
  color?: string;
  icon?: IconComponent;
  width?: DimensionValue;
} & Omit<PressableProps, 'children'>;

export const InlineButton = ({
  variant,
  size,
  label,
  bgColor,
  activeBgColor,
  color,
  icon: Icon,
  width,
  disabled = false,
  ...pressableProps
}: InlineButtonProps) => {
  const theme = useTheme();
  const isDisabled = Boolean(disabled);

  const contentColor = isDisabled
    ? theme.colors.text.text4
    : color
      ? color
      : variant === 'primary'
        ? theme.colors.text.textW
        : theme.colors.text.text1;

  return (
    <Pressable {...pressableProps} disabled={isDisabled} accessibilityRole="button">
      {({ pressed }) => (
        <ButtonContainer
          $size={size}
          $width={width}
          $variant={variant}
          $pressed={pressed}
          $disabled={isDisabled}
          $bgColor={bgColor}
          $activeBgColor={activeBgColor}
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
  $activeBgColor?: string;
}>(({ theme, $size, $width, $variant, $pressed, $disabled, $bgColor, $activeBgColor }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
  width: $width,
  height: $size === 'M' ? 34 : 42,
  borderRadius: 10,
  paddingHorizontal: 12,
  overflow: 'hidden',
  backgroundColor: getButtonBackgroundColor({
    theme,
    variant: $variant,
    pressed: $pressed,
    disabled: $disabled,
    bgColor: $bgColor,
    activeBgColor: $activeBgColor,
  }),
  borderWidth: $variant === 'ghost' ? 1 : 0,
  borderColor: $variant === 'ghost' ? theme.colors.border.border1 : 'transparent',
}));

const ButtonLabel = styled.Text(({ theme }) => ({
  ...theme.fonts.labelXS,
}));
