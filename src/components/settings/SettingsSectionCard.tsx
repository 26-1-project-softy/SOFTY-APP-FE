import styled from '@emotion/native';
import { ReactNode } from 'react';

type SettingsSectionCardProps = {
  title: string;
  action?: ReactNode;
  description?: string;
  children: ReactNode;
};

export const SettingsSectionCard = ({
  title,
  description,
  action,
  children,
}: SettingsSectionCardProps) => {
  return (
    <CardContainer>
      <CardHeaderSection>
        <CardHeaderRow>
          <CardTitle>{title}</CardTitle>
          {action && <CardActionContainer>{action}</CardActionContainer>}
        </CardHeaderRow>

        {description && <CardDescription>{description}</CardDescription>}
      </CardHeaderSection>

      <CardContent>{children}</CardContent>
    </CardContainer>
  );
};

const CardContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.background.bg1,
  borderRadius: 10,
  paddingVertical: 8,
}));

const CardHeaderSection = styled.View({
  paddingHorizontal: 16,
  paddingVertical: 12,
  gap: 4,
});

const CardHeaderRow = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
});

const CardActionContainer = styled.View({
  flexShrink: 0,
});

const CardTitle = styled.Text(({ theme }) => ({
  ...theme.fonts.title3,
  color: theme.colors.text.text1,
  flex: 1,
}));

const CardDescription = styled.Text(({ theme }) => ({
  ...theme.fonts.caption,
  color: theme.colors.text.text4,
}));

const CardContent = styled.View({
  gap: 10,
});
