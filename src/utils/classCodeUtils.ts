const classCodeInvalidCharPattern = /[^A-Z0-9-]/i;
const classCodePattern = /^[A-Z0-9]{3}-[A-Z0-9]{3}$/;

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
