const nameInvalidCharPattern = /[^A-Zㄱ-ㅎㅏ-ㅣ가-힣\s]/i;
const incompleteKoreanCharPattern = /[ㄱ-ㅎㅏ-ㅣ]/;

export const getNormalizedName = (value: string) => {
  return value.replace(/\s/g, '');
};

export const hasInvalidNameChar = (value: string) => {
  return nameInvalidCharPattern.test(value);
};

export const hasIncompleteKoreanChar = (value: string) => {
  const normalizedValue = getNormalizedName(value);

  if (!normalizedValue) {
    return false;
  }

  return incompleteKoreanCharPattern.test(value);
};

export const validateName = (value: string) => {
  const normalizedValue = getNormalizedName(value);

  return (
    !hasInvalidNameChar(value) && !hasIncompleteKoreanChar(value) && normalizedValue.length >= 2
  );
};

export const getNameErrorMessage = (value: string) => {
  const normalizedValue = getNormalizedName(value);

  if (value.length === 0) {
    return undefined;
  }

  if (hasInvalidNameChar(value)) {
    return '한글과 영문만 입력할 수 있어요.';
  }

  if (hasIncompleteKoreanChar(value)) {
    return '완성된 한글 또는 영문 이름을 입력해 주세요.';
  }

  if (normalizedValue.length < 2) {
    return '이름은 두 글자 이상 입력해 주세요.';
  }

  return undefined;
};

export const getBirthDateDigits = (value: string) => {
  return value.replace(/[^0-9]/g, '').slice(0, 8);
};

export const getBirthDateDisplayText = (value: string) => {
  if (value.length <= 4) {
    return value;
  }

  if (value.length <= 6) {
    return `${value.slice(0, 4)}-${value.slice(4)}`;
  }

  return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
};

const MIN_STUDENT_BIRTH_YEAR = 2000;

export const validateBirthDate = (value: string) => {
  if (value.length !== 8) {
    return false;
  }

  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(4, 6));
  const day = Number(value.slice(6, 8));

  if (!year || month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  if (year < MIN_STUDENT_BIRTH_YEAR) {
    return false;
  }

  const date = new Date(year, month - 1, day);

  const isSameDate =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;

  if (!isSameDate) {
    return false;
  }

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  return date <= today;
};

export const getBirthDateErrorMessage = (value: string) => {
  if (value.length === 0) {
    return undefined;
  }

  if (value.length < 8) {
    return '생년월일 8자리를 입력해 주세요.';
  }

  if (!validateBirthDate(value)) {
    return '유효한 생년월일을 입력해 주세요.';
  }

  return undefined;
};
