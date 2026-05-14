import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { InlineButton } from '@/components/common/InlineButton';
import { IcError, IcRefresh } from '@/assets/icons';

type SectionErrorStateProps = {
  title?: string;
  description?: string;
  onRetry: () => void;
};

export const SectionErrorState = ({
  title = '정보를 불러올 수 없어요',
  description = '잠시 후 다시 시도해 주세요.',
  onRetry,
}: SectionErrorStateProps) => {
  const theme = useTheme();

  return (
    <SectionErrorStateContainer>
      <SectionErrorIcon>
        <IcError width={30} height={30} color={theme.colors.semantic.error} />
      </SectionErrorIcon>

      <SectionErrorTitle>{title}</SectionErrorTitle>
      <SectionErrorDescription>{description}</SectionErrorDescription>

      <InlineButton
        variant="primary"
        size="L"
        icon={IcRefresh}
        label="다시 시도"
        onPress={onRetry}
      />
    </SectionErrorStateContainer>
  );
};

const SectionErrorStateContainer = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  gap: 16,
});

const SectionErrorIcon = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

const SectionErrorTitle = styled.Text(({ theme }) => ({
  ...theme.fonts.labelS,
  color: theme.colors.text.text1,
  textAlign: 'center',
}));

const SectionErrorDescription = styled.Text(({ theme }) => ({
  ...theme.fonts.body2,
  color: theme.colors.text.text1,
  textAlign: 'center',
}));
