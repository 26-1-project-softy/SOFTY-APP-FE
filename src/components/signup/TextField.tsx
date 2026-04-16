import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { TextInput, type TextInputProps } from 'react-native';
import { FieldLabel } from './FieldLabel';

type TextFieldProps = {
  label?: string;
  value: string;
  placeholder?: string;
  isRequired?: boolean;
  errorMessage?: string;
  onChangeText: (text: string) => void;
} & Omit<TextInputProps, 'value' | 'onChangeText' | 'placeholder'>;

export const TextField = ({
  label,
  value,
  placeholder,
  isRequired = false,
  errorMessage,
  onChangeText,
  ...textInputProps
}: TextFieldProps) => {
  const theme = useTheme();

  return (
    <FieldContainer>
      {label && <FieldLabel label={label} isRequired={isRequired} />}

      <FieldInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.text4}
        onChangeText={onChangeText}
        {...textInputProps}
      />

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </FieldContainer>
  );
};

const FieldContainer = styled.View({
  gap: 8,
});

const FieldInput = styled(TextInput)(({ theme }) => ({
  ...theme.fonts.body2,
  height: 40,
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderWidth: 1,
  borderColor: theme.colors.border.border2,
  borderRadius: 8,
  color: theme.colors.text.text1,
  backgroundColor: theme.colors.background.bg1,
}));

const ErrorMessage = styled.Text(({ theme }) => ({
  ...theme.fonts.caption,
  color: theme.colors.semantic.error,
}));
