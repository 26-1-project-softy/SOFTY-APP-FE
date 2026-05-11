import styled from '@emotion/native';
import { Pressable, type PressableProps } from 'react-native';
import { useTheme } from '@emotion/react';
import { getButtonBackgroundColor } from '@/utils/getButtonBackgroundColor';
import type { IconComponent } from '@/types/icon';

type IconButtonVariant = 'primary' | 'ghost' | 'plain';

type IconButtonProps = {
  icon: IconComponent;
  variant: IconButtonVariant;
  buttonSize?: number;
} & Omit<PressableProps, 'children'>;

export const IconButton = ({
  icon: Icon,
  variant,
  disabled = false,
  buttonSize = 40,
  ...pressableProps
}: IconButtonProps) => {
  const theme = useTheme();
  const isDisabled = Boolean(disabled);

  const iconColor = isDisabled
    ? theme.colors.text.text4
    : variant === 'primary'
      ? theme.colors.text.textW
      : theme.colors.text.text1;

  return (
    <Pressable {...pressableProps} disabled={isDisabled} accessibilityRole="button">
      {({ pressed }) => (
        <ButtonContainer
          $variant={variant}
          $size={buttonSize}
          $pressed={pressed}
          $disabled={isDisabled}
        >
          <Icon color={iconColor} />
        </ButtonContainer>
      )}
    </Pressable>
  );
};

const ButtonContainer = styled.View<{
  $variant: IconButtonVariant;
  $size: number;
  $pressed: boolean;
  $disabled: boolean;
}>(({ theme, $variant, $size, $pressed, $disabled }) => ({
  width: $size,
  height: $size,
  borderRadius: 999,
  borderWidth: $variant === 'ghost' ? 1 : 0,
  borderColor: $variant === 'ghost' ? theme.colors.border.border1 : 'transparent',
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  backgroundColor: getButtonBackgroundColor({
    theme,
    variant: $variant,
    pressed: $pressed,
    disabled: $disabled,
  }),
}));
