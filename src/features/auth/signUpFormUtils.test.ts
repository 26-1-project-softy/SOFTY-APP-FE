import { describe, expect, it } from 'vitest';
import {
  getBirthDateDigits,
  getBirthDateDisplayText,
  validateBirthDate,
  getBirthDateErrorMessage,
  validateName,
  getNameErrorMessage,
} from './signUpFormUtils';
import {
  getClassCodeErrorMessage,
  getNormalizedClassCode,
  hasInvalidClassCodeChar,
  validateClassCode,
} from '@/utils/classCodeUtils';

describe('signUpFormUtils', () => {
  describe('validateName', () => {
    it('공백 제외 두 글자 이상인 완성된 한글 또는 영문 이름이면 true를 반환한다', () => {
      expect(validateName('홍길동')).toBe(true);
      expect(validateName('홍 길')).toBe(true);
      expect(validateName('Softy')).toBe(true);
    });

    it('두 글자 미만이면 false를 반환한다', () => {
      expect(validateName('홍')).toBe(false);
      expect(validateName('A')).toBe(false);
    });

    it('숫자나 특수문자가 포함되면 false를 반환한다', () => {
      expect(validateName('홍1동')).toBe(false);
      expect(validateName('홍@동')).toBe(false);
      expect(validateName('Softy1')).toBe(false);
    });

    it('자음 또는 모음만 포함된 미완성 한글이면 false를 반환한다', () => {
      expect(validateName('ㅊ')).toBe(false);
      expect(validateName('ㅏ')).toBe(false);
      expect(validateName('ㅊㅏ')).toBe(false);
    });
  });

  describe('getNameErrorMessage', () => {
    it('입력이 비어 있으면 undefined를 반환한다', () => {
      expect(getNameErrorMessage('')).toBeUndefined();
    });

    it('숫자나 특수문자가 포함되면 문자 제한 에러 메시지를 반환한다', () => {
      expect(getNameErrorMessage('홍1동')).toBe('한글과 영문만 입력할 수 있어요.');
      expect(getNameErrorMessage('홍@동')).toBe('한글과 영문만 입력할 수 있어요.');
    });

    it('자음 또는 모음만 입력되면 미완성 한글 에러 메시지를 반환한다', () => {
      expect(getNameErrorMessage('ㅊ')).toBe('완성된 한글 또는 영문 이름을 입력해 주세요.');
      expect(getNameErrorMessage('ㅏ')).toBe('완성된 한글 또는 영문 이름을 입력해 주세요.');
      expect(getNameErrorMessage('ㅊㅏ')).toBe('완성된 한글 또는 영문 이름을 입력해 주세요.');
    });

    it('두 글자 미만이면 길이 에러 메시지를 반환한다', () => {
      expect(getNameErrorMessage('홍')).toBe('이름은 두 글자 이상 입력해 주세요.');
    });

    it('정상이면 undefined를 반환한다', () => {
      expect(getNameErrorMessage('홍길동')).toBeUndefined();
    });
  });

  describe('getBirthDateDigits', () => {
    it('숫자만 남기고 8자리까지만 반환한다', () => {
      expect(getBirthDateDigits('2024-01-31')).toBe('20240131');
      expect(getBirthDateDigits('2024abcd013199')).toBe('20240131');
    });
  });

  describe('getBirthDateDisplayText', () => {
    it('생년월일 숫자 문자열을 YYYY-MM-DD 형식으로 변환한다', () => {
      expect(getBirthDateDisplayText('20240131')).toBe('2024-01-31');
      expect(getBirthDateDisplayText('202401')).toBe('2024-01');
      expect(getBirthDateDisplayText('2024')).toBe('2024');
    });
  });

  describe('validateBirthDate', () => {
    it('유효한 날짜면 true를 반환한다', () => {
      expect(validateBirthDate('20240229')).toBe(true);
      expect(validateBirthDate('20240131')).toBe(true);
    });

    it('유효하지 않은 날짜면 false를 반환한다', () => {
      expect(validateBirthDate('20240230')).toBe(false);
      expect(validateBirthDate('20241301')).toBe(false);
      expect(validateBirthDate('202401')).toBe(false);
    });

    it('최소 연도보다 작으면 false를 반환한다', () => {
      expect(validateBirthDate('19991231')).toBe(false);
    });

    it('미래 날짜면 false를 반환한다', () => {
      expect(validateBirthDate('20991231')).toBe(false);
    });
  });

  describe('getBirthDateErrorMessage', () => {
    it('8자리 미만이면 길이 에러 메시지를 반환한다', () => {
      expect(getBirthDateErrorMessage('202401')).toBe('생년월일 8자리를 입력해 주세요.');
    });

    it('유효하지 않은 날짜면 날짜 에러 메시지를 반환한다', () => {
      expect(getBirthDateErrorMessage('20240230')).toBe('유효한 생년월일을 입력해 주세요.');
      expect(getBirthDateErrorMessage('19991231')).toBe('유효한 생년월일을 입력해 주세요.');
      expect(getBirthDateErrorMessage('20991231')).toBe('유효한 생년월일을 입력해 주세요.');
    });

    it('정상이면 undefined를 반환한다', () => {
      expect(getBirthDateErrorMessage('20240229')).toBeUndefined();
    });
  });

  describe('classCode', () => {
    it('학급 코드를 대문자로 정규화한다', () => {
      expect(getNormalizedClassCode('abc-3de')).toBe('ABC-3DE');
      expect(getNormalizedClassCode('AbC-3dE')).toBe('ABC-3DE');
    });

    it('허용되지 않는 문자가 있으면 true를 반환한다', () => {
      expect(hasInvalidClassCodeChar('ABC-3D@')).toBe(true);
      expect(hasInvalidClassCodeChar('ABC-3DE')).toBe(false);
    });

    it('정상 형식이면 true를 반환한다', () => {
      expect(validateClassCode('ABC-3DE')).toBe(true);
      expect(validateClassCode('ABC3DE')).toBe(false);
      expect(validateClassCode('AB-3DE')).toBe(false);
    });

    it('학급 코드 에러 메시지를 올바르게 반환한다', () => {
      expect(getClassCodeErrorMessage('ABC-3D')).toBe('학급 코드는 7글자로 입력해 주세요.');
      expect(getClassCodeErrorMessage('ABC-3D@')).toBe('영문 대문자와 숫자만 사용할 수 있어요.');
      expect(getClassCodeErrorMessage('ABC3DE')).toBe('학급 코드는 7글자로 입력해 주세요.');
      expect(getClassCodeErrorMessage('ABCD-3E')).toBe(
        '학급 코드는 영문과 숫자를 조합해 3글자-3글자 형식으로 입력해 주세요.'
      );
      expect(getClassCodeErrorMessage('ABC-3DE')).toBeUndefined();
    });
  });
});
