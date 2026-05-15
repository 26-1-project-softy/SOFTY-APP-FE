const DAY_LABEL_BY_NUMBER: Record<number, string> = {
  0: '일',
  1: '월',
  2: '화',
  3: '수',
  4: '목',
  5: '금',
  6: '토',
};

export const getDayLabel = (dayOfWeek: number) => {
  return DAY_LABEL_BY_NUMBER[dayOfWeek] ?? '';
};

export const formatScheduleTime = (time: string) => {
  return time.slice(0, 5);
};

export const formatScheduleTimeRange = (startTime: string, endTime: string) => {
  return `${formatScheduleTime(startTime)} ~ ${formatScheduleTime(endTime)}`;
};
