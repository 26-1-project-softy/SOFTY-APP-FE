import {
  INQUIRY_INTENT,
  INQUIRY_INTENT_LABEL,
  type InquiryIntentType,
} from '@/constants/inquiryIntent';

export const getInquiryIntentByLabel = (intentLabel: string): InquiryIntentType => {
  const matchedIntent = (
    Object.entries(INQUIRY_INTENT_LABEL) as [InquiryIntentType, string][]
  ).find(([, label]) => label === intentLabel)?.[0];

  return matchedIntent ?? INQUIRY_INTENT.ETC;
};
