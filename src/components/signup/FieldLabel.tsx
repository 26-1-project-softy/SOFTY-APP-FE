import styled from '@emotion/native';

type FieldLabelRowProps = {
  label: string;
  isRequired?: boolean;
};

export const FieldLabel = ({ label, isRequired = false }: FieldLabelRowProps) => {
  return (
    <FieldLabelContainer>
      <FieldLabelText>{label}</FieldLabelText>
      {isRequired && <FieldRequiredMark>*</FieldRequiredMark>}
    </FieldLabelContainer>
  );
};

const FieldLabelContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
});

const FieldLabelText = styled.Text(({ theme }) => ({
  ...theme.fonts.labelS,
  color: theme.colors.text.text1,
}));

const FieldRequiredMark = styled.Text(({ theme }) => ({
  ...theme.fonts.labelS,
  color: theme.colors.semantic.error,
}));
