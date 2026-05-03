import { useInquiryFormState } from './useInquiryFormState';
import { useAnalyzeIntent } from './useAnalyzeIntent';
import { useSubmitInquiry } from './useSubmitInquiry';
import { getInquiryIntentByLabel } from '@/features/newInquiry/utils/getInquiryIntentByLabel';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { useToastStore } from '@/stores/toastStore';
import { INQUIRY_INTENT } from '@/constants/inquiryIntent';

const ANALYZE_INTENT_ERROR_MESSAGE = 'AI 의도 분석 중 오류가 발생했어요. 다시 시도해 주세요.';
const SUBMIT_INQUIRY_ERROR_MESSAGE = '문의 전송 중 오류가 발생했어요. 다시 시도해 주세요.';

export const useInquiryForm = () => {
  const state = useInquiryFormState();
  const showToast = useToastStore(state => state.showToast);
  const { analyzeIntent, isAnalyzingIntent } = useAnalyzeIntent();
  const { submitInquiry, isSubmittingInquiry } = useSubmitInquiry();

  const handleAnalyzeIntent = async () => {
    if (!state.content.trim() || isAnalyzingIntent) return;

    try {
      const result = await analyzeIntent({
        content: state.content,
      });

      state.setSelectedIntent(getInquiryIntentByLabel(result.intentLabel));
      state.setIsAnalyzed(true);
      state.setIsIntentConfirmed(false);
    } catch (error) {
      showToast(getErrorMessage(error, ANALYZE_INTENT_ERROR_MESSAGE), 'error');
    }
  };

  const resetAnalysis = () => {
    state.setIsAnalyzed(false);
    state.setIsIntentConfirmed(false);
    state.setSelectedIntent(INQUIRY_INTENT.INQUIRY);
  };

  const handleSubmit = async () => {
    if (!state.content.trim() || !state.isIntentConfirmed || isSubmittingInquiry) return null;

    try {
      const result = await submitInquiry({
        content: state.content,
        selectedIntent: state.selectedIntent,
      });

      showToast('문의가 전송됐어요.', 'success');

      return result;
    } catch (error) {
      showToast(getErrorMessage(error, SUBMIT_INQUIRY_ERROR_MESSAGE), 'error');

      return null;
    }
  };

  return {
    ...state,
    isAnalyzingIntent,
    isSubmittingInquiry,
    handleAnalyzeIntent,
    resetAnalysis,
    handleSubmit,
  };
};
