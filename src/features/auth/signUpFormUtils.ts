import type { Gender } from '@/services/auth/authApi';

const nameInvalidCharPattern = /[^A-Z가-힣\s]/i;
const classCodeInvalidCharPattern = /[^A-Z0-9-]/i;
const classCodePattern = /^[A-Z0-9]{3}-[A-Z0-9]{3}$/;

export const getNormalizedName = (value: string) => {
  return value.replace(/\s/g, '');
};

export const hasInvalidNameChar = (value: string) => {
  return nameInvalidCharPattern.test(value);
};

export const validateName = (value: string) => {
  return !hasInvalidNameChar(value) && getNormalizedName(value).length >= 2;
};

export const getNameErrorMessage = (value: string) => {
  if (value.length === 0) {
    return undefined;
  }

  if (hasInvalidNameChar(value)) {
    return '특수문자는 사용할 수 없어요.';
  }

  if (getNormalizedName(value).length < 2) {
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

export const getNormalizedClassCode = (value: string) => {
  return value.toUpperCase();
};

export const hasInvalidClassCodeChar = (value: string) => {
  return classCodeInvalidCharPattern.test(value);
};

export const validateClassCode = (value: string) => {
  return classCodePattern.test(value);
};

export const getClassCodeErrorMessage = (value: string) => {
  if (value.length === 0) {
    return undefined;
  }

  if (hasInvalidClassCodeChar(value)) {
    return '영문 대문자와 숫자만 사용할 수 있어요.';
  }

  if (value.length < 7) {
    return '학급 코드는 7글자로 입력해 주세요.';
  }

  if (!validateClassCode(value)) {
    return '학급 코드는 영문과 숫자를 조합해 3글자-3글자 형식으로 입력해 주세요.';
  }

  return undefined;
};

export type { Gender };
