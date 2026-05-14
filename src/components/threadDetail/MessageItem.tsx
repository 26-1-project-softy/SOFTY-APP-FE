import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { IconBadge } from '@/components/common/IconBadge';
import type { ThreadMessageItem } from '@/features/threadDetail/queries/useThreadMessages';
import { IcDefaultProfile } from '@/assets/icons';

type MessageItemProps = {
  item: ThreadMessageItem;
};

export const MessageItem = ({ item }: MessageItemProps) => {
  const theme = useTheme();
  const shouldShowUnreadCount = item.isMine && item.isUnreadByCounterpart;

  return (
    <MessageGroup $isMine={item.isMine}>
      {item.isMine ? (
        <>
          <MyMessageRow>
            {shouldShowUnreadCount && <UnreadCount>1</UnreadCount>}

            <MessageBubble $isMine={item.isMine}>
              <MessageText $isMine={item.isMine}>{item.content}</MessageText>
            </MessageBubble>
          </MyMessageRow>
          <MessageTime>{item.createdAt}</MessageTime>
        </>
      ) : (
        <>
          <SenderProfileRow>
            <IconBadge
              symbol={IcDefaultProfile}
              size={36}
              bgColor={theme.colors.background.bg4}
              color={theme.colors.brand.dark}
            />

            <SenderName>{item.senderName}</SenderName>
          </SenderProfileRow>

          <MessageBubble $isMine={item.isMine}>
            <MessageText $isMine={item.isMine}>{item.content}</MessageText>
          </MessageBubble>

          <MessageTime>{item.createdAt}</MessageTime>
        </>
      )}
    </MessageGroup>
  );
};

const MessageGroup = styled.View<{ $isMine: boolean }>(({ $isMine }) => ({
  alignItems: $isMine ? 'flex-end' : 'flex-start',
  gap: 8,
}));

const MyMessageRow = styled.View({
  flexDirection: 'row',
  alignItems: 'flex-end',
  gap: 8,
});

const UnreadCount = styled.Text(({ theme }) => ({
  ...theme.fonts.caption,
  color: theme.colors.brand.primary,
}));

const MessageTime = styled.Text(({ theme }) => ({
  ...theme.fonts.caption,
  color: theme.colors.text.text4,
}));

const MessageBubble = styled.View<{ $isMine: boolean }>(({ theme, $isMine }) => ({
  maxWidth: '72%',
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 20,
  borderTopRightRadius: $isMine ? 0 : 20,
  borderTopLeftRadius: $isMine ? 20 : 0,
  backgroundColor: $isMine ? theme.colors.brand.primary : theme.colors.background.bg1,
}));

const MessageText = styled.Text<{ $isMine: boolean }>(({ theme, $isMine }) => ({
  ...theme.fonts.body2,
  color: $isMine ? theme.colors.text.textW : theme.colors.text.text1,
}));

const SenderProfileRow = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
});

const SenderName = styled.Text(({ theme }) => ({
  ...theme.fonts.labelXS,
  color: theme.colors.text.text1,
}));
