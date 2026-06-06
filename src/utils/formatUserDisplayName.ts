const WITHDRAWN_USER_NAME_PATTERN = /^withdrawn_user_\d+$/;
const UNKNOWN_USER_DISPLAY_NAME = '(알 수 없음)';

export const isWithdrawnUserName = (name?: string | null) => {
  if (!name) return false;

  return WITHDRAWN_USER_NAME_PATTERN.test(name.trim());
};

export const formatUserDisplayName = (name?: string | null) => {
  if (!name) return '';

  const trimmedName = name.trim();

  if (isWithdrawnUserName(trimmedName)) {
    return UNKNOWN_USER_DISPLAY_NAME;
  }

  return trimmedName;
};
