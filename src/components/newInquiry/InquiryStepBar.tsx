import styled from '@emotion/native';

type Step = 1 | 2;

export const InquiryStepBar = ({ step }: { step: Step }) => {
  return (
    <Bar>
      <ActiveBar style={{ width: step === 1 ? '50%' : '100%' }} />
    </Bar>
  );
};

const Bar = styled.View(({ theme }) => ({
  height: 4,
  backgroundColor: theme.colors.neutral.neutral200,
  borderRadius: 999,
}));

const ActiveBar = styled.View(({ theme }) => ({
  height: 4,
  backgroundColor: theme.colors.brand.primary,
  borderRadius: 999,
}));
