import { Alert } from '@/components/common/Alert';

export const TeacherOffNotice = () => {
  return (
    <Alert
      variant="warning"
      title="현재는 선생님 근무시간이 아니에요"
      description="메시지는 전송되지만, 확인 및 답변은 다음 근무시간에 이뤄질 수 있어요."
    />
  );
};
