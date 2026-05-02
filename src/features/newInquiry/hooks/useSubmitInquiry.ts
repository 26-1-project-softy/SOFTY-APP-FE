import type { InquiryIntentType } from '@/constants/inquiryIntent';

interface Params {
  content: string;
  selectedIntent: InquiryIntentType;
}

export const useSubmitInquiry = () => {
  // TODO: 문의 전송 API 연동 후 useMutation 기반으로 교체
  const submitInquiry = ({ content, selectedIntent }: Params) => {
    if (__DEV__) {
      console.log('문의 전송 요청', { content, selectedIntent });
    }
  };

  return { submitInquiry };
};
