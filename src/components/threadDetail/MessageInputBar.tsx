import styled from '@emotion/native';
import { IconButton } from '@/components/common/IconButton';
import { TextArea } from '@/components/common/TextArea';
import { IcSend } from '@/assets/icons';

type MessageInputBarProps = {
  value: string;
  disabled: boolean;
  canSend: boolean;
  onChangeText: (value: string) => void;
  onPressSend: () => void;
};

export const MessageInputBar = ({
  value,
  disabled,
  canSend,
  onChangeText,
  onPressSend,
}: MessageInputBarProps) => {
  return (
    <MessageInputSection>
      <TextArea
        value={value}
        placeholder="메시지를 작성해주세요."
        onChangeText={onChangeText}
        editable={!disabled}
        minHeight={40}
        maxHeight={120}
      />

      <IconButton
        icon={IcSend}
        variant="primary"
        disabled={!canSend}
        onPress={onPressSend}
        accessibilityLabel="메시지 전송"
      />
    </MessageInputSection>
  );
};

const MessageInputSection = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'flex-end',
  paddingVertical: 8,
  paddingHorizontal: 12,
  gap: 10,
  backgroundColor: theme.colors.background.bg1,
}));
