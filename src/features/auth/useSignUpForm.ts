import { useState } from 'react';
import type { SignUpRequest, Gender } from '@/services/auth/authApi';
import {
  getBirthDateDigits,
  getBirthDateDisplayText,
  getBirthDateErrorMessage,
  validateName,
  validateBirthDate,
  getNameErrorMessage,
} from '@/features/auth/signUpFormUtils';
import {
  getClassCodeErrorMessage,
  getNormalizedClassCode,
  validateClassCode,
} from '@/utils/classCodeUtils';

export const useSignUpForm = () => {
  const [parentName, setParentName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentBirthDateDigits, setStudentBirthDateDigits] = useState('');
  const [studentGender, setStudentGender] = useState<Gender>('M');
  const [classCode, setClassCode] = useState('');

  const handleChangeParentName = (text: string) => {
    setParentName(text);
  };

  const handleChangeStudentName = (text: string) => {
    setStudentName(text);
  };

  const handleChangeStudentBirthDate = (text: string) => {
    setStudentBirthDateDigits(getBirthDateDigits(text));
  };

  const handleSelectMale = () => {
    setStudentGender('M');
  };

  const handleSelectFemale = () => {
    setStudentGender('F');
  };

  const handleChangeClassCode = (text: string) => {
    setClassCode(getNormalizedClassCode(text));
  };

  const isParentNameValid = validateName(parentName);
  const isStudentNameValid = validateName(studentName);
  const isStudentBirthDateValid = validateBirthDate(studentBirthDateDigits);
  const isClassCodeValid = validateClassCode(classCode);

  const parentNameErrorMessage = getNameErrorMessage(parentName);
  const studentNameErrorMessage = getNameErrorMessage(studentName);
  const studentBirthDateErrorMessage = getBirthDateErrorMessage(studentBirthDateDigits);
  const classCodeErrorMessage = getClassCodeErrorMessage(classCode);

  const studentBirthDateDisplayText = getBirthDateDisplayText(studentBirthDateDigits);

  const signUpPayload: SignUpRequest = {
    parentName: parentName.trim(),
    studentName: studentName.trim(),
    studentBirthday: studentBirthDateDisplayText,
    studentGender,
    classCode: classCode.trim(),
  };

  const isFormValid =
    isParentNameValid && isStudentNameValid && isStudentBirthDateValid && isClassCodeValid;

  return {
    parentName,
    studentName,
    studentBirthDateDisplayText,
    studentGender,
    classCode,
    isFormValid,
    parentNameErrorMessage,
    studentNameErrorMessage,
    studentBirthDateErrorMessage,
    classCodeErrorMessage,
    signUpPayload,
    handleChangeParentName,
    handleChangeStudentName,
    handleChangeStudentBirthDate,
    handleSelectMale,
    handleSelectFemale,
    handleChangeClassCode,
  };
};
