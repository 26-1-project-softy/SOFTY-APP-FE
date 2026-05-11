import styled from '@emotion/native';
import { Tag } from '@/components/common/Tag';
import type { ThreadListItem } from '@/features/threadList/hooks/useThreadList';

type ThreadCardProps = {
  item: ThreadListItem;
  onPress: () => void;
};

export const ThreadCard = ({ item, onPress }: ThreadCardProps) => {
  return (
    <ThreadCardButton onPress={onPress}>
      <ThreadInfoArea>
        <TagGroup>
          <Tag intent={item.intent} />
          <Tag status={item.status} />
        </TagGroup>

        <ThreadPreviewText numberOfLines={2} ellipsizeMode="tail">
          {item.lastMessage}
        </ThreadPreviewText>
      </ThreadInfoArea>

      <ThreadMetaArea>
        <ThreadTimeText>{item.lastMessageTime}</ThreadTimeText>

        {item.unreadCount > 0 && (
          <UnreadBadge>
            <UnreadBadgeText>{item.unreadCount}</UnreadBadgeText>
          </UnreadBadge>
        )}
      </ThreadMetaArea>
    </ThreadCardButton>
  );
};

const ThreadCardButton = styled.Pressable(({ theme }) => ({
  flexDirection: 'row',
  backgroundColor: theme.colors.background.bg1,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: theme.colors.border.border1,
  padding: 16,
  gap: 18,
}));

const ThreadInfoArea = styled.View({
  flex: 1,
  minWidth: 0,
  gap: 10,
});

const TagGroup = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  flexShrink: 1,
  gap: 10,
});

const ThreadPreviewText = styled.Text(({ theme }) => ({
  ...theme.fonts.body2,
  color: theme.colors.text.text4,
}));

const ThreadMetaArea = styled.View({
  alignItems: 'flex-end',
  gap: 10,
});

const ThreadTimeText = styled.Text(({ theme }) => ({
  flexShrink: 0,
  ...theme.fonts.body2,
  color: theme.colors.text.text4,
}));

const UnreadBadge = styled.View(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 32,
  height: 32,
  backgroundColor: theme.colors.brand.primary,
  borderRadius: 999,
  paddingHorizontal: 12,
}));

const UnreadBadgeText = styled.Text(({ theme }) => ({
  ...theme.fonts.labelXS,
  color: theme.colors.text.textW,
}));
