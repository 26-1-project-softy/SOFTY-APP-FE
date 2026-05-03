import { useMutation } from '@tanstack/react-query';
import { newInquiryApi } from '@/services/newInquiryApi';

export const useAnalyzeIntent = () => {
  const analyzeIntentMutation = useMutation({
    mutationFn: newInquiryApi.analyzeInitialInquiry,
  });

  return {
    analyzeIntent: analyzeIntentMutation.mutateAsync,
    isAnalyzingIntent: analyzeIntentMutation.isPending,
  };
};
