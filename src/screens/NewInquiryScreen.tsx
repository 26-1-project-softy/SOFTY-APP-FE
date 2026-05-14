import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Checkbox from 'expo-checkbox';
import { useInquiryForm } from '@/features/newInquiry/hooks/useInquiryForm';
import { useTeacherWorkStatus } from '@/features/newInquiry/hooks/useTeacherWorkStatus';
import { Header } from '@/components/common/Header';
import { InquiryStepBar } from '@/components/newInquiry/InquiryStepBar';
import { TeacherOffNotice } from '@/components/common/TeacherOffNotice';
import { TextArea } from '@/components/common/TextArea';
import { SectionCard, SectionCardContent } from '@/components/common/SectionCard';
import { InlineButton } from '@/components/common/InlineButton';
import { Tag } from '@/components/common/Tag';
import { IntentSelectSheet } from '@/components/newInquiry/IntentSelectSheet';
import type { MainStackParamList } from '@/types/navigation';
import { IcPencil, IcSend, IcSparkles } from '@/assets/icons';
import { MAIN_ROUTES } from '@/navigation/routes';

type NewInquiryNavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const NewInquiryScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NewInquiryNavigationProp>();

  const {
    content,
    setContent,
    selectedIntent,
    setSelectedIntent,
    isAnalyzed,
    isIntentConfirmed,
    setIsIntentConfirmed,
    isAnalyzingIntent,
    isSubmittingInquiry,
    handleAnalyzeIntent,
    resetAnalysis,
    handleSubmit,
  } = useInquiryForm();

  const { isTeacherOff } = useTeacherWorkStatus();

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const isSubmitDisabled = !isIntentConfirmed;

  const handlePressBackToMessageInput = () => {
    resetAnalysis();
    setIsSheetOpen(false);
  };

  const handlePressSubmit = async () => {
    const result = await handleSubmit();

    if (!result) return;

    navigation.replace(MAIN_ROUTES.THREAD_DETAIL, {
      chatRoomId: result.chatRoomId,
    });
  };

  return (
    <NewInquiryScreenContainer>
      <Header
        hasBackBtn
        title="새 문의 작성"
        onBackPress={isAnalyzed ? handlePressBackToMessageInput : undefined}
      />

      <InquiryStepBar step={isAnalyzed ? 2 : 1} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <NewInquiryScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
          <NewInquiryContentContainer>
            {isTeacherOff && <TeacherOffNotice />}

            <TextArea
              value={content}
              editable={!isAnalyzed}
              placeholder="선생님께 보낼 문의 내용을 작성해주세요."
              onChangeText={text => {
                setContent(text);
                setIsIntentConfirmed(false);
              }}
            />

            {isAnalyzed && (
              <SectionCard
                title="AI 의도 분석 결과"
                titleIcon={IcSparkles}
                headerAction={
                  <InlineButton
                    variant="ghost"
                    size="M"
                    icon={IcPencil}
                    label="의도 변경"
                    onPress={() => setIsSheetOpen(true)}
                  />
                }
              >
                <SectionCardContent>
                  <AnalysisResultContentWrapper>
                    <Tag intent={selectedIntent} />
                    <IntentConfirmRow>
                      <Checkbox
                        value={isIntentConfirmed}
                        onValueChange={setIsIntentConfirmed}
                        color={isIntentConfirmed ? theme.colors.brand.primary : undefined}
                      />
                      <IntentConfirmLabelButton onPress={() => setIsIntentConfirmed(prev => !prev)}>
                        <IntentConfirmText>AI 분석 결과를 확인했어요</IntentConfirmText>
                      </IntentConfirmLabelButton>
                    </IntentConfirmRow>
                  </AnalysisResultContentWrapper>
                </SectionCardContent>
              </SectionCard>
            )}

            {!isAnalyzed ? (
              <InlineButton
                variant="primary"
                size="L"
                icon={IcSparkles}
                label="AI 의도 분석하기"
                disabled={!content.trim() || isAnalyzingIntent}
                onPress={handleAnalyzeIntent}
              />
            ) : (
              <InlineButton
                variant="primary"
                size="L"
                icon={IcSend}
                label="전송"
                disabled={isSubmitDisabled || isSubmittingInquiry}
                onPress={handlePressSubmit}
              />
            )}
          </NewInquiryContentContainer>
        </NewInquiryScrollView>
      </KeyboardAvoidingView>

      <IntentSelectSheet
        visible={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        selectedIntent={selectedIntent}
        onSelect={intent => {
          setSelectedIntent(intent);
          setIsIntentConfirmed(false);
          setIsSheetOpen(false);
        }}
      />
    </NewInquiryScreenContainer>
  );
};

const NewInquiryScreenContainer = styled.View({
  flex: 1,
});

const NewInquiryScrollView = styled.ScrollView({
  flex: 1,
});

const NewInquiryContentContainer = styled.View({
  paddingVertical: 20,
  paddingHorizontal: 16,
  gap: 16,
});

const AnalysisResultContentWrapper = styled.View({
  gap: 16,
});

const IntentConfirmRow = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
});

const IntentConfirmLabelButton = styled.Pressable({
  flexShrink: 1,
});

const IntentConfirmText = styled.Text(({ theme }) => ({
  ...theme.fonts.caption,
  color: theme.colors.text.text2,
}));
