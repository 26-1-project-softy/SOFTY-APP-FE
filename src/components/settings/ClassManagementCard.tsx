import styled from '@emotion/native';
import { SectionCard } from '@/components/common/SectionCard';
import { InlineButton } from '@/components/common/InlineButton';

type ClassManagementCardProps = {
  classLabel: string;
  studentName: string;
  teacherName: string;
  onPressChange: () => void;
};

export const ClassManagementCard = ({
  classLabel,
  studentName,
  teacherName,
  onPressChange,
}: ClassManagementCardProps) => {
  return (
    <SectionCard
      title="학급 관리"
      headerAction={
        <InlineButton variant="primary" size="M" label="변경하기" onPress={onPressChange} />
      }
    >
      <SettingsInfoList>
        <SettingsInfoRow>
          <SettingsInfoLabel>학급</SettingsInfoLabel>
          <SettingsInfoValue>{classLabel}</SettingsInfoValue>
        </SettingsInfoRow>

        <SettingsInfoRow>
          <SettingsInfoLabel>자녀</SettingsInfoLabel>
          <SettingsInfoValue>{studentName}</SettingsInfoValue>
        </SettingsInfoRow>

        <SettingsInfoRow>
          <SettingsInfoLabel>담임 선생님</SettingsInfoLabel>
          <SettingsInfoValue>{teacherName}</SettingsInfoValue>
        </SettingsInfoRow>
      </SettingsInfoList>
    </SectionCard>
  );
};

const SettingsInfoList = styled.View({
  paddingVertical: 8,
});

const SettingsInfoRow = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 8,
  paddingHorizontal: 20,
  gap: 16,
});

const SettingsInfoLabel = styled.Text(({ theme }) => ({
  ...theme.fonts.body2,
  color: theme.colors.text.text1,
}));

const SettingsInfoValue = styled.Text(({ theme }) => ({
  ...theme.fonts.body2,
  color: theme.colors.text.text1,
  textAlign: 'right',
  flexShrink: 1,
}));
