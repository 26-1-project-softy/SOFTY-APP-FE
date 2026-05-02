import type { Theme } from '@emotion/react';

export type ButtonBackgroundVariant = 'primary' | 'ghost' | 'text' | 'plain';

type GetButtonBackgroundColorParams = {
  theme: Theme;
  variant: ButtonBackgroundVariant;
  pressed: boolean;
  disabled: boolean;
  bgColor?: string;
  activeBgColor?: string;
};

export const getButtonBackgroundColor = ({
  theme,
  variant,
  pressed,
  disabled,
  bgColor,
  activeBgColor,
}: GetButtonBackgroundColorParams) => {
  if (disabled) {
    return theme.colors.background.bg5;
  }

  if (pressed && activeBgColor) {
    return activeBgColor;
  }

  if (pressed && variant === 'primary') {
    return theme.colors.background.brandHover;
  }

  if (pressed && variant !== 'primary') {
    return theme.colors.background.bg5;
  }

  if (bgColor) {
    return bgColor;
  }

  if (variant === 'primary') {
    return theme.colors.brand.primary;
  }

  if (variant === 'ghost') {
    return theme.colors.background.bg1;
  }

  return 'transparent';
};
