import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { IconBadge } from '@/components/common/IconBadge';
import { SectionCard, SectionCardContent } from '@/components/common/SectionCard';
import { IcDefaultProfile } from '@/assets/icons';

type ProfileInfoCardProps = {
  studentName: string;
};

export const ProfileInfoCard = ({ studentName }: ProfileInfoCardProps) => {
  const theme = useTheme();

  return (
    <SectionCard title="프로필 정보">
      <SectionCardContent>
        <ProfileRow>
          <IconBadge
            symbol={IcDefaultProfile}
            size={36}
            bgColor={theme.colors.background.bg4}
            color={theme.colors.brand.dark}
          />

          <ProfileName>{studentName}</ProfileName>
        </ProfileRow>
      </SectionCardContent>
    </SectionCard>
  );
};

const ProfileRow = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 16,
});

const ProfileName = styled.Text(({ theme }) => ({
  ...theme.fonts.labelS,
  color: theme.colors.text.text1,
}));
