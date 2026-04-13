import styled from '@emotion/native';
import { Pressable, type DimensionValue } from 'react-native';
import { IconComponent } from '@/types/icon';

type ButtonSize = 'M' | 'L';
type ButtonVariants = 'primary' | 'ghost' | 'text';

interface InlineButtonProps {
  variant: ButtonVariants;
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
  return (
    <ButtonContainer
      $variant={variant}
      $size={size}
      $width={width}
      $bgColor={bgColor}
      disabled={disabled}
      onPress={onPress}
    >
      {({ pressed }) => (
        <ButtonContent $pressed={pressed}>
          {Icon && <Icon color={color} fill={color} />}
          <ButtonLabel $variant={variant} $color={color} $disabled={disabled}>
            {label}
          </ButtonLabel>
        </ButtonContent>
      )}
    </ButtonContainer>
  );
};

const ButtonContainer = styled(Pressable)<{
  $size: ButtonSize;
  $width?: DimensionValue;
  $bgColor?: string;
  $variant: ButtonVariants;
  disabled: boolean;
}>(({ theme, $size, $width, $bgColor, $variant, disabled }) => ({
  width: $width,
  height: $size === 'M' ? 32 : 40,
  borderRadius: 10,
  paddingHorizontal: 12,
  backgroundColor: disabled
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
  justifyContent: 'center',
  alignItems: 'center',
}));

const ButtonContent = styled.View<{
  $pressed: boolean;
}>(({ $pressed }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
  opacity: $pressed ? 0.85 : 1,
}));

const ButtonLabel = styled.Text<{
  $variant: ButtonVariants;
  $color?: string;
  $disabled: boolean;
}>(({ theme, $variant, $color, $disabled }) => ({
  ...theme.fonts.labelXS,
  color: $disabled
    ? theme.colors.text.text4
    : $color
      ? $color
      : $variant === 'primary'
        ? theme.colors.text.textW
        : theme.colors.text.text1,
}));
