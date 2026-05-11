import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { parentSettingApi } from '@/services/parentSettingApi';

export const useParentSetting = () => {
  const parentSettingQuery = useQuery({
    queryKey: QUERY_KEYS.parentSetting,
    queryFn: parentSettingApi.getSetting,
    staleTime: 1000 * 60 * 5,
  });

  const parentSetting = parentSettingQuery.data;
  const classLabel = parentSetting
    ? `${parentSetting.grade}학년 ${parentSetting.classNumber}반`
    : '';

  return {
    parentSetting,
    classLabel,
    studentName: parentSetting?.studentName ?? '',
    teacherName: parentSetting?.teacherName ?? '',
    isParentSettingLoading: parentSettingQuery.isLoading,
    isParentSettingError: parentSettingQuery.isError,
    refetchParentSetting: parentSettingQuery.refetch,
  };
};
