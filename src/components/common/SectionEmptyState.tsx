import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import type { IconComponent } from '@/types/icon';

type SectionEmptyStateProps = {
  icon: IconComponent;
  title?: string;
  description?: string;
};

export const SectionEmptyState = ({
  icon: Icon,
  title = '표시할 데이터가 없어요',
  description,
}: SectionEmptyStateProps) => {
  const theme = useTheme();

  return (
    <SectionEmptyStateContainer>
      <SectionEmptyIcon>
        <Icon color={theme.colors.text.text4} />
      </SectionEmptyIcon>
      <SectionEmptyStateTitle>{title}</SectionEmptyStateTitle>
      {description && <SectionEmptyStateDescription>{description}</SectionEmptyStateDescription>}
    </SectionEmptyStateContainer>
  );
};

const SectionEmptyStateContainer = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  gap: 16,
});

const SectionEmptyIcon = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

const SectionEmptyStateTitle = styled.Text(({ theme }) => ({
  ...theme.fonts.labelS,
  color: theme.colors.text.text4,
  textAlign: 'center',
}));

const SectionEmptyStateDescription = styled.Text(({ theme }) => ({
  ...theme.fonts.body2,
  color: theme.colors.text.text4,
  textAlign: 'center',
}));
