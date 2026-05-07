import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { teacherWorkStatusApi } from '@/services/teacherWorkStatusApi';

export const useTeacherWorkStatus = () => {
  const teacherWorkStatusQuery = useQuery({
    queryKey: QUERY_KEYS.teacherWorkStatus,
    queryFn: teacherWorkStatusApi.getStatus,
    staleTime: 1000 * 60,
  });

  const isTeacherOff = teacherWorkStatusQuery.data?.isInWorkingHours === false;

  return {
    isTeacherOff,
  };
};
