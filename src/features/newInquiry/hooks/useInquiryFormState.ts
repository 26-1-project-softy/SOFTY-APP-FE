import { useState } from 'react';
import { INQUIRY_INTENT, type InquiryIntentType } from '@/constants/inquiryIntent';

export const useInquiryFormState = () => {
  const [content, setContent] = useState('');
  const [selectedIntent, setSelectedIntent] = useState<InquiryIntentType>(INQUIRY_INTENT.INQUIRY);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isIntentConfirmed, setIsIntentConfirmed] = useState(false);

  return {
    content,
    setContent,
    selectedIntent,
    setSelectedIntent,
    isAnalyzed,
    setIsAnalyzed,
    isIntentConfirmed,
    setIsIntentConfirmed,
  };
};
