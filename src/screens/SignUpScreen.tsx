import styled from '@emotion/native';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/common/Header';
import { InlineButton } from '@/components/common/InlineButton';
import { TextField } from '@/components/signup/TextField';
import { RadioButton } from '@/components/signup/RadioButton';
import { FieldLabel } from '@/components/signup/FieldLabel';
import { useSignUpForm } from '@/features/auth/useSignUpForm';
import { useSignUpSubmit } from '@/features/auth/useSignUpSubmit';
import { IcLogout } from '@/assets/icons';

export const SignUpScreen = () => {
  const {
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
  } = useSignUpForm();

  const { isSignUpSubmitting, handlePressSignUp } = useSignUpSubmit();

  const isSubmitDisabled = !isFormValid || isSignUpSubmitting;

  const handlePressSubmit = () => {
    if (isSubmitDisabled) return;
    handlePressSignUp(signUpPayload);
  };

  return (
    <SignUpSafeArea edges={['bottom']}>
      <Header />

      <SignUpScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <SignUpContentContainer>
          <SignUpIntroSection>
            <SignUpTitle>{`학급 참여`}</SignUpTitle>
            <SignUpDescription>{`담임 선생님께 받은 학급 코드를 입력하세요.`}</SignUpDescription>
          </SignUpIntroSection>

          <SignUpFormContainer>
            <FormSection>
              <SectionTitle>{`학부모 정보`}</SectionTitle>

              <TextField
                label="이름"
                isRequired
                value={parentName}
                placeholder="홍길동"
                errorMessage={parentNameErrorMessage}
                onChangeText={handleChangeParentName}
              />
            </FormSection>

            <FormSection>
              <SectionTitle>{`자녀 정보`}</SectionTitle>

              <TextField
                label="자녀 이름"
                isRequired
                value={studentName}
                placeholder="홍길동"
                errorMessage={studentNameErrorMessage}
                onChangeText={handleChangeStudentName}
              />

              <TextField
                label="자녀 생년월일"
                isRequired
                value={studentBirthDateDisplayText}
                placeholder="YYYY-MM-DD"
                keyboardType="number-pad"
                inputMode="numeric"
                maxLength={10}
                errorMessage={studentBirthDateErrorMessage}
                onChangeText={handleChangeStudentBirthDate}
              />

              <RadioFieldContainer>
                <FieldLabel label="자녀 성별" isRequired />

                <GenderOptionContainer>
                  <RadioButton
                    label="남"
                    isSelected={studentGender === 'M'}
                    onPress={handleSelectMale}
                  />
                  <RadioButton
                    label="여"
                    isSelected={studentGender === 'F'}
                    onPress={handleSelectFemale}
                  />
                </GenderOptionContainer>
              </RadioFieldContainer>
            </FormSection>

            <FormSection>
              <SectionTitle>{`학급 정보`}</SectionTitle>

              <TextField
                label="학급 코드"
                isRequired
                value={classCode}
                placeholder="ABC-3DE"
                autoCapitalize="characters"
                autoCorrect={false}
                maxLength={7}
                errorMessage={classCodeErrorMessage}
                onChangeText={handleChangeClassCode}
              />
            </FormSection>
          </SignUpFormContainer>

          <InlineButton
            variant="primary"
            size="L"
            label="참여하기"
            width="100%"
            disabled={isSubmitDisabled}
            onPress={handlePressSubmit}
          />
        </SignUpContentContainer>
      </SignUpScrollView>
    </SignUpSafeArea>
  );
};

const SignUpSafeArea = styled(SafeAreaView)({
  flex: 1,
});

const SignUpScrollView = styled(ScrollView)({
  flex: 1,
});

const SignUpContentContainer = styled.View({
  paddingHorizontal: 16,
  paddingVertical: 32,
  gap: 60,
});

const SignUpIntroSection = styled.View({
  alignItems: 'center',
  gap: 16,
});

const SignUpTitle = styled.Text(({ theme }) => ({
  ...theme.fonts.labelL,
  color: theme.colors.text.text1,
  textAlign: 'center',
}));

const SignUpDescription = styled.Text(({ theme }) => ({
  ...theme.fonts.caption,
  color: theme.colors.text.text1,
  textAlign: 'center',
}));

const SignUpFormContainer = styled.View({
  gap: 48,
});

const FormSection = styled.View({
  gap: 16,
});

const SectionTitle = styled.Text(({ theme }) => ({
  ...theme.fonts.labelM,
  color: theme.colors.text.text1,
}));

const RadioFieldContainer = styled.View({
  gap: 8,
});

const GenderOptionContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 20,
});
