export const getErrorMessage = (error: unknown, fallbackMessage: string): string => {
  if (error instanceof Error) {
    return error.message.trim() || fallbackMessage;
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message.trim() || fallbackMessage;
  }

  return fallbackMessage;
};
