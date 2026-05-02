import styled from '@emotion/native';
import { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '@emotion/react';
import { useInquiryForm } from '@/features/newInquiry/hooks/useInquiryForm';
import { Header } from '@/components/common/Header';
import { InquiryStepBar } from '@/components/newInquiry/InquiryStepBar';
import { Alert } from '@/components/common/Alert';
import { TextArea } from '@/components/newInquiry/TextArea';
import { SectionCard, SectionCardContent } from '@/components/common/SectionCard';
import { InlineButton } from '@/components/common/InlineButton';
import { Tag } from '@/components/common/Tag';
import { IntentSelectSheet } from '@/components/newInquiry/IntentSelectSheet';
import { IcPencil, IcSend, IcSparkles } from '@/assets/icons';

export const NewInquiryScreen = () => {
  const theme = useTheme();

  const {
    content,
    setContent,
    selectedIntent,
    setSelectedIntent,
    isAnalyzed,
    isIntentConfirmed,
    setIsIntentConfirmed,
    isTeacherOff,
    handleAnalyzeIntent,
    resetAnalysis,
    handleSubmit,
  } = useInquiryForm();

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const isSubmitDisabled = !isIntentConfirmed;

  const handlePressBackToMessageInput = () => {
    resetAnalysis();
    setIsSheetOpen(false);
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
            {isTeacherOff && (
              <Alert
                variant="warning"
                title="현재는 선생님 근무시간이 아니에요"
                description="메시지는 전송되지만, 확인 및 답변은 다음 근무시간에 이뤄질 수 있어요."
              />
            )}

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
                disabled={!content.trim()}
                onPress={handleAnalyzeIntent}
              />
            ) : (
              <InlineButton
                variant="primary"
                size="L"
                icon={IcSend}
                label="전송"
                disabled={isSubmitDisabled}
                onPress={handleSubmit}
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
