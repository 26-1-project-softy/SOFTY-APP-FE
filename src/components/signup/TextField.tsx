import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { TextInput, type TextInputProps } from 'react-native';
import { FieldLabel } from './FieldLabel';

type TextFieldProps = {
  label?: string;
  value: string;
  placeholder?: string;
  isRequired?: boolean;
  helperText?: string;
  errorMessage?: string;
  onChangeText: (text: string) => void;
} & Omit<TextInputProps, 'value' | 'onChangeText' | 'placeholder'>;

export const TextField = ({
  label,
  value,
  placeholder,
  isRequired = false,
  helperText,
  errorMessage,
  onChangeText,
  ...textInputProps
}: TextFieldProps) => {
  const theme = useTheme();
  const hasError = Boolean(errorMessage);
  const helperMessage = errorMessage ?? helperText;

  return (
    <FieldContainer>
      {label && <FieldLabel label={label} isRequired={isRequired} hasError={hasError} />}

      <FieldInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.text4}
        onChangeText={onChangeText}
        $hasError={hasError}
        {...textInputProps}
      />

      {helperMessage && <HelperText $hasError={hasError}>{helperMessage}</HelperText>}
    </FieldContainer>
  );
};

const FieldContainer = styled.View({
  gap: 8,
});

const FieldInput = styled(TextInput)<{ $hasError: boolean }>(({ theme, $hasError }) => ({
  ...theme.fonts.body2,
  height: 40,
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderWidth: 1,
  borderColor: $hasError ? theme.colors.semantic.error : theme.colors.border.border2,
  borderRadius: 8,
  color: theme.colors.text.text1,
  backgroundColor: theme.colors.background.bg1,
}));

const HelperText = styled.Text<{ $hasError: boolean }>(({ theme, $hasError }) => ({
  ...theme.fonts.caption,
  color: $hasError ? theme.colors.semantic.error : theme.colors.text.text4,
}));
