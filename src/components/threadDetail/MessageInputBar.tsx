import styled from '@emotion/native';
import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';
import { IconButton } from '@/components/common/IconButton';
import { TextArea } from '@/components/common/TextArea';
import { IcSend } from '@/assets/icons';

type MessageInputBarProps = {
  value: string;
  disabled: boolean;
  canSend: boolean;
  onChangeText: (value: string) => void;
  onPressSend: () => void;
  onFocusInput?: () => void;
  onBlurInput?: () => void;
};

const MESSAGE_INPUT_PADDING = 8;
const MESSAGE_INPUT_CLOSED_BOTTOM_PADDING = 24;

export const MessageInputBar = ({
  value,
  disabled,
  canSend,
  onChangeText,
  onPressSend,
  onFocusInput,
  onBlurInput,
}: MessageInputBarProps) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSubscription = Keyboard.addListener(showEvent, () => {
      setIsKeyboardVisible(true);
    });

    const hideSubscription = Keyboard.addListener(hideEvent, () => {
      setIsKeyboardVisible(false);
      onBlurInput?.();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const bottomPadding = isKeyboardVisible
    ? MESSAGE_INPUT_PADDING
    : MESSAGE_INPUT_CLOSED_BOTTOM_PADDING;

  return (
    <MessageInputSection style={{ paddingBottom: bottomPadding }}>
      <TextArea
        value={value}
        placeholder="메시지를 작성해주세요."
        onChangeText={onChangeText}
        editable={!disabled}
        minHeight={40}
        maxHeight={120}
        onFocus={onFocusInput}
        onBlur={onBlurInput}
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
  paddingTop: MESSAGE_INPUT_PADDING,
  paddingHorizontal: 12,
  gap: 10,
  backgroundColor: theme.colors.background.bg1,
}));
