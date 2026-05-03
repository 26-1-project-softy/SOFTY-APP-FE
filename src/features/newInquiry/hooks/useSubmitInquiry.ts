import { useMutation } from '@tanstack/react-query';
import { newInquiryApi } from '@/services/newInquiryApi';
import { INQUIRY_INTENT_LABEL, type InquiryIntentType } from '@/constants/inquiryIntent';

type SubmitInquiryParams = {
  content: string;
  selectedIntent: InquiryIntentType;
};

export const useSubmitInquiry = () => {
  const submitInquiryMutation = useMutation({
    mutationFn: ({ content, selectedIntent }: SubmitInquiryParams) => {
      const payload = {
        content,
        intentLabel: INQUIRY_INTENT_LABEL[selectedIntent],
      };

      return newInquiryApi.sendInitialInquiry(payload);
    },
  });

  return {
    submitInquiry: submitInquiryMutation.mutateAsync,
    isSubmittingInquiry: submitInquiryMutation.isPending,
  };
};
