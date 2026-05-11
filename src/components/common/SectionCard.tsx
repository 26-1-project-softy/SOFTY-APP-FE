import styled from '@emotion/native';
import type { PropsWithChildren, ReactNode } from 'react';
import type { IconComponent } from '@/types/icon';
import { useTheme } from '@emotion/react';

type SectionCardProps = PropsWithChildren<{
  title: string;
  titleIcon?: IconComponent;
  description?: string;
  headerAction?: ReactNode;
}>;

export const SectionCard = ({
  title,
  titleIcon: Icon,
  description,
  headerAction,
  children,
}: SectionCardProps) => {
  const theme = useTheme();

  return (
    <SectionCardContainer>
      <SectionCardHeader>
        <SectionCardTextArea>
          <SectionCardTitleRow>
            {Icon && <Icon color={theme.colors.brand.dark} />}
            <SectionCardTitleText>{title}</SectionCardTitleText>
          </SectionCardTitleRow>
          {description ? <SectionCardDescription>{description}</SectionCardDescription> : null}
        </SectionCardTextArea>

        {headerAction ? <SectionCardActionArea>{headerAction}</SectionCardActionArea> : null}
      </SectionCardHeader>

      {children}
    </SectionCardContainer>
  );
};

export const SectionCardContent = ({ children }: PropsWithChildren) => {
  return <CardContentContainer>{children}</CardContentContainer>;
};

const SectionCardContainer = styled.View(({ theme }) => ({
  minWidth: 0,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: theme.colors.border.border1,
  backgroundColor: theme.colors.background.bg1,
}));

const SectionCardHeader = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 20,
  paddingVertical: 12,
  gap: 16,
});

const SectionCardTextArea = styled.View({
  flex: 1,
  minWidth: 0,
});

const SectionCardTitleRow = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
});

const SectionCardTitleText = styled.Text(({ theme }) => ({
  ...theme.fonts.labelS,
  color: theme.colors.text.text1,
}));

const SectionCardDescription = styled.Text(({ theme }) => ({
  ...theme.fonts.caption,
  color: theme.colors.text.text4,
}));

const SectionCardActionArea = styled.View({
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
});

const CardContentContainer = styled.View({
  paddingHorizontal: 20,
  paddingVertical: 16,
});
