import { getInquiryIntentByLabel } from '@/features/newInquiry/utils/getInquiryIntentByLabel';
import { formatMessagePreviewDateTime } from '@/utils/formatDateTime';
import type { ThreadListResponse } from '@/services/threadListApi';
import type { ThreadListItem } from '@/features/threadList/hooks/useThreadList';

export const mapThreadListResponse = (thread: ThreadListResponse): ThreadListItem => ({
  chatRoomId: thread.chatRoomId,
  intent: getInquiryIntentByLabel(thread.intentLabel),
  status: thread.status,
  lastMessage: thread.lastMessage,
  lastMessageTime: formatMessagePreviewDateTime(thread.lastMessageAt),
  unreadCount: thread.unreadCount,
});
