import { AxiosError } from 'axios';
import { getErrorMessage } from '@/utils/getErrorMessage';

type ErrorResponseData = {
  code?: number;
};

type ApiErrorLike = {
  code?: number;
  httpStatus?: number;
  originalError?: unknown;
};

const PREVIEW_CLASS_NOT_FOUND_MESSAGE = '존재하지 않는 학급이에요. 학급 코드를 다시 확인해 주세요.';
const PREVIEW_CLASS_ERROR_MESSAGE = '요청 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.';

export const getPreviewClassErrorMessage = (error: unknown) => {
  if (isNotFoundError(error)) {
    return PREVIEW_CLASS_NOT_FOUND_MESSAGE;
  }

  return getErrorMessage(error, PREVIEW_CLASS_ERROR_MESSAGE);
};

const isNotFoundError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const code = (error.response?.data as ErrorResponseData | undefined)?.code;

    return status === 404 || code === 404;
  }

  if (isApiErrorLike(error)) {
    return error.httpStatus === 404 || error.code === 404 || isNotFoundError(error.originalError);
  }

  return false;
};

const isApiErrorLike = (error: unknown): error is ApiErrorLike => {
  return typeof error === 'object' && error !== null;
};
