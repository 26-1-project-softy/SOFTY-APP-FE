import styled from '@emotion/native';

type FieldLabelRowProps = {
  label: string;
  isRequired?: boolean;
  hasError?: boolean;
};

export const FieldLabel = ({ label, isRequired = false, hasError = false }: FieldLabelRowProps) => {
  return (
    <FieldLabelContainer>
      <FieldLabelText $hasError={hasError}>{label}</FieldLabelText>
      {isRequired && <FieldRequiredMark>*</FieldRequiredMark>}
    </FieldLabelContainer>
  );
};

const FieldLabelContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
});

const FieldLabelText = styled.Text<{ $hasError: boolean }>(({ theme, $hasError }) => ({
  ...theme.fonts.labelS,
  color: $hasError ? theme.colors.semantic.error : theme.colors.text.text1,
}));

const FieldRequiredMark = styled.Text(({ theme }) => ({
  ...theme.fonts.labelS,
  color: theme.colors.semantic.error,
}));
