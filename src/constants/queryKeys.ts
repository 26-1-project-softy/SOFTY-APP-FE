export const QUERY_KEYS = {
  teacherWorkStatus: ['teacherWorkStatus'],
  threadList: ['threadList'],
  parentSetting: ['parentSetting'],
  threadDetail: (chatRoomId: number) => ['threadDetail', chatRoomId],
  threadMessages: (chatRoomId: number) => ['threadMessages', chatRoomId],
  me: ['me'],
} as const;
