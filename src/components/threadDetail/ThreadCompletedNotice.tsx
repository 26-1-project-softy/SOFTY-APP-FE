import { Alert } from '@/components/common/Alert';

export const ThreadCompletedNotice = () => {
  return (
    <Alert
      variant="warning"
      title="문의 처리가 완료되었어요"
      description="이 채팅방에서는 더 이상 메시지를 보낼 수 없어요. 추가 문의가 필요하면 새 문의를 작성해주세요."
    />
  );
};
