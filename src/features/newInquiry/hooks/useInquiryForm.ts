import { useInquiryFormState } from './useInquiryFormState';
import { useAnalyzeIntent } from './useAnalyzeIntent';
import { useSubmitInquiry } from './useSubmitInquiry';
import { INQUIRY_INTENT } from '@/constants/inquiryIntent';

export const useInquiryForm = () => {
  const state = useInquiryFormState();
  const { analyzeIntent } = useAnalyzeIntent();
  const { submitInquiry } = useSubmitInquiry();

  const handleAnalyzeIntent = () => {
    if (!state.content.trim()) return;

    analyzeIntent({
      content: state.content,
      setSelectedIntent: state.setSelectedIntent,
      setIsAnalyzed: state.setIsAnalyzed,
    });

    state.setIsIntentConfirmed(false);
  };

  const resetAnalysis = () => {
    state.setIsAnalyzed(false);
    state.setIsIntentConfirmed(false);
    state.setSelectedIntent(INQUIRY_INTENT.INQUIRY);
  };

  const handleSubmit = () => {
    submitInquiry({
      content: state.content,
      selectedIntent: state.selectedIntent,
    });
  };

  const isTeacherOff = true;

  return {
    ...state,
    isTeacherOff,
    handleAnalyzeIntent,
    resetAnalysis,
    handleSubmit,
  };
};
