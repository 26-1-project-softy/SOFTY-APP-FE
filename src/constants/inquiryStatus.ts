export const INQUIRY_STATUS = {
  PROCESSING: 'processing',
  COMPLETED: 'completed',
} as const;

export type InquiryStatusType = (typeof INQUIRY_STATUS)[keyof typeof INQUIRY_STATUS];

export const INQUIRY_STATUS_LABEL: Record<InquiryStatusType, string> = {
  processing: '처리중',
  completed: '처리완료',
};

export const INQUIRY_STATUS_COLOR_KEY = {
  processing: 'processing',
  completed: 'completed',
} as const;
