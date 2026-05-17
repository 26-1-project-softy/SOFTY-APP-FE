import styled from '@emotion/native';
import { SectionCard, SectionCardContent } from '@/components/common/SectionCard';
import { formatScheduleTimeRange, getDayLabel } from '@/utils/formatSchedule';
import { SectionEmptyState } from '@/components/common/SectionEmptyState';
import { IcCalendar } from '@/assets/icons';

type TeacherSchedule = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};

type TeacherScheduleCardProps = {
  schedules: TeacherSchedule[];
};

export const TeacherScheduleCard = ({ schedules }: TeacherScheduleCardProps) => {
  const hasSchedules = schedules.length > 0;

  return (
    <SectionCard
      title="선생님 근무시간"
      description="근무시간 외에 전송된 메시지는 다음 근무시간에 확인될 수 있어요."
    >
      <SectionCardContent>
        {hasSchedules ? (
          <ScheduleList>
            {schedules.map(schedule => (
              <ScheduleRow key={schedule.dayOfWeek}>
                <ScheduleDay>{getDayLabel(schedule.dayOfWeek)}</ScheduleDay>

                <ScheduleTimeBadge>
                  <ScheduleTime>
                    {formatScheduleTimeRange(schedule.startTime, schedule.endTime)}
                  </ScheduleTime>
                </ScheduleTimeBadge>
              </ScheduleRow>
            ))}
          </ScheduleList>
        ) : (
          <SectionEmptyState icon={IcCalendar} title="설정된 근무시간이 없어요" />
        )}
      </SectionCardContent>
    </SectionCard>
  );
};

const ScheduleList = styled.View({
  gap: 12,
});

const ScheduleRow = styled.View(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: 12,
  borderWidth: 1,
  borderColor: theme.colors.border.border1,
  paddingVertical: 12,
  paddingHorizontal: 16,
}));

const ScheduleDay = styled.Text(({ theme }) => ({
  ...theme.fonts.labelXS,
  color: theme.colors.text.text1,
}));

const ScheduleTimeBadge = styled.View(({ theme }) => ({
  paddingHorizontal: 12,
  paddingVertical: 8,
  backgroundColor: theme.colors.background.bg2,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: theme.colors.border.border2,
}));

const ScheduleTime = styled.Text(({ theme }) => ({
  ...theme.fonts.body2,
  color: theme.colors.text.text1,
}));
