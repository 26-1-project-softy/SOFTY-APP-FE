import { INQUIRY_INTENT, type InquiryIntentType } from '@/constants/inquiryIntent';

interface Params {
  content: string;
  setSelectedIntent: (intent: InquiryIntentType) => void;
  setIsAnalyzed: (value: boolean) => void;
}

export const useAnalyzeIntent = () => {
  // TODO: 의도 분석 API 연동 후 useMutation 기반으로 교체
  const analyzeIntent = ({ content, setSelectedIntent, setIsAnalyzed }: Params) => {
    if (content.includes('병원')) {
      setSelectedIntent(INQUIRY_INTENT.ABSENCE_LATE);
    } else {
      setSelectedIntent(INQUIRY_INTENT.INQUIRY);
    }

    setIsAnalyzed(true);
  };

  return { analyzeIntent };
};
