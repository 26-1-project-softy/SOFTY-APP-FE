export type ThreadMessageItem = {
  messageId: number;
  isMine: boolean;
  senderName: string;
  content: string;
  createdAt: string;
  isUnreadByCounterpart: boolean;
};
