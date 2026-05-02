import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import {
  INQUIRY_INTENT_COLOR_KEY,
  INQUIRY_INTENT_LABEL,
  type InquiryIntentType,
} from '@/constants/inquiryIntent';
import {
  INQUIRY_STATUS_COLOR_KEY,
  INQUIRY_STATUS_LABEL,
  type InquiryStatusType,
} from '@/constants/inquiryStatus';

type TagColorSet = {
  text: string;
  background: string;
  border: string;
};

type TagProps =
  | {
      intent: InquiryIntentType;
      status?: never;
    }
  | {
      intent?: never;
      status: InquiryStatusType;
    };

export const Tag = ({ intent, status }: TagProps) => {
  const theme = useTheme();

  if (intent) {
    const colorSet = theme.colors.intent[INQUIRY_INTENT_COLOR_KEY[intent]];

    return (
      <TagContainer $colorSet={colorSet}>
        <TagLabelText $colorSet={colorSet}>{INQUIRY_INTENT_LABEL[intent]}</TagLabelText>
      </TagContainer>
    );
  }

  const colorSet = theme.colors.threadStatus[INQUIRY_STATUS_COLOR_KEY[status]];

  return (
    <TagContainer $colorSet={colorSet}>
      <TagLabelText $colorSet={colorSet}>{INQUIRY_STATUS_LABEL[status]}</TagLabelText>
    </TagContainer>
  );
};

const TagContainer = styled.View<{ $colorSet: TagColorSet }>(({ $colorSet }) => ({
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 999,
  borderWidth: 1,
  borderColor: $colorSet.border,
  backgroundColor: $colorSet.background,
  alignSelf: 'flex-start',
}));

const TagLabelText = styled.Text<{ $colorSet: TagColorSet }>(({ theme, $colorSet }) => ({
  ...theme.fonts.labelXS,
  color: $colorSet.text,
}));
