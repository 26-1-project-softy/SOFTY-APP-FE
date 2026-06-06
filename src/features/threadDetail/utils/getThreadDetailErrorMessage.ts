import { getErrorMessage } from '@/utils/getErrorMessage';

const SEND_MESSAGE_NOT_FOUND_MESSAGE =
  '채팅방을 찾을 수 없거나 메시지를 보낼 수 없는 상태예요. 새로고침 후 다시 시도해 주세요.';
const SEND_MESSAGE_ERROR_MESSAGE = '메시지를 전송하지 못했어요. 잠시 후 다시 시도해 주세요.';

export const getSendMessageErrorMessage = (error: unknown) => {
  const apiError = error as { httpStatus?: number; code?: number; message?: string };

  if (apiError.httpStatus === 404 || apiError.code === 404) {
    return SEND_MESSAGE_NOT_FOUND_MESSAGE;
  }

  return getErrorMessage(error, SEND_MESSAGE_ERROR_MESSAGE);
};
