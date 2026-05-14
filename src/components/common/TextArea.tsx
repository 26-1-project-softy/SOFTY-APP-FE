import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import type { TextInputProps } from 'react-native';

type TextAreaProps = {
  minHeight?: number;
  maxHeight?: number;
} & Omit<TextInputProps, 'multiline'>;

export const TextArea = ({
  editable = true,
  minHeight = 140,
  maxHeight,
  ...textInputProps
}: TextAreaProps) => {
  const theme = useTheme();

  return (
    <TextAreaInput
      multiline
      editable={editable}
      $editable={editable}
      $minHeight={minHeight}
      $maxHeight={maxHeight}
      placeholderTextColor={theme.colors.text.text4}
      {...textInputProps}
    />
  );
};

const TextAreaInput = styled.TextInput<{
  $editable: boolean;
  $minHeight: number;
  $maxHeight?: number;
}>(({ theme, $editable, $minHeight, $maxHeight }) => ({
  textAlignVertical: 'top',
  minHeight: 140,
  ...theme.fonts.body2,
  color: theme.colors.text.text1,
  backgroundColor: $editable ? theme.colors.background.bg1 : theme.colors.background.bg3,
  borderWidth: 1,
  borderColor: $editable ? theme.colors.border.border2 : theme.colors.border.border1,
  borderRadius: 8,
  paddingVertical: 8,
  paddingHorizontal: 12,
}));
