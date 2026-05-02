export const INQUIRY_INTENT = {
  ABSENCE_LATE: 'ABSENCE_LATE',
  COUNSELING: 'COUNSELING',
  REQUEST: 'REQUEST',
  INQUIRY: 'INQUIRY',
} as const;

export type InquiryIntentType = (typeof INQUIRY_INTENT)[keyof typeof INQUIRY_INTENT];

export const INQUIRY_INTENT_LABEL: Record<InquiryIntentType, string> = {
  ABSENCE_LATE: '결석/지각',
  COUNSELING: '상담',
  REQUEST: '요청',
  INQUIRY: '문의',
};

export const INQUIRY_INTENT_COLOR_KEY = {
  ABSENCE_LATE: 'absenceLate',
  COUNSELING: 'counseling',
  REQUEST: 'request',
  INQUIRY: 'inquiry',
} as const;
