import { useMutation } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { queryClient } from '@/providers/queryClient';
import { parentSettingApi } from '@/services/parentSettingApi';

export const useChangeClass = () => {
  const previewClassChangeMutation = useMutation({
    mutationFn: parentSettingApi.previewClassChange,
  });

  const changeClassMutation = useMutation({
    mutationFn: parentSettingApi.changeClass,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.parentSetting,
      });

      void queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.teacherWorkStatus,
      });

      void queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.threadList,
      });
    },
  });

  return {
    previewClassChange: previewClassChangeMutation.mutateAsync,
    changeClass: changeClassMutation.mutateAsync,
    classPreview: previewClassChangeMutation.data ?? null,
    isPreviewingClassChange: previewClassChangeMutation.isPending,
    isChangingClass: changeClassMutation.isPending,
    resetClassPreview: previewClassChangeMutation.reset,
  };
};
