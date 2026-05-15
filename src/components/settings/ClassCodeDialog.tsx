import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { Dialog } from '@/components/settings/Dialog';
import { IconBadge } from '@/components/common/IconBadge';
import { InlineButton } from '@/components/common/InlineButton';
import { TextField } from '@/components/common/TextField';
import { Alert } from '@/components/common/Alert';
import { IcChange } from '@/assets/icons';

type ClassCodeDialogProps = {
  isVisible: boolean;
  classCode: string;
  classCodeErrorMessage?: string;
  classChangeErrorMessage?: string;
  isLoading: boolean;
  isSubmitDisabled: boolean;
  onChangeClassCode: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};

export const ClassCodeDialog = ({
  isVisible,
  classCode,
  classCodeErrorMessage,
  classChangeErrorMessage,
  isLoading,
  isSubmitDisabled,
  onChangeClassCode,
  onClose,
  onSubmit,
}: ClassCodeDialogProps) => {
  const theme = useTheme();

  return (
    <Dialog
      isVisible={isVisible}
      title="학급 변경"
      description="새로 참여할 학급의 코드를 입력해주세요."
      onRequestClose={onClose}
      isDismissible={!isLoading}
      icon={
        <IconBadge
          symbol={IcChange}
          bgColor={theme.colors.background.bg4}
          color={theme.colors.brand.dark}
          iconSize={30}
        />
      }
      footer={
        <DialogButtonRow>
          <DialogButtonWrapper>
            <InlineButton
              variant="ghost"
              size="L"
              label="취소"
              disabled={isLoading}
              onPress={onClose}
            />
          </DialogButtonWrapper>

          <DialogButtonWrapper>
            <InlineButton
              variant="primary"
              size="L"
              label="변경하기"
              disabled={isSubmitDisabled}
              onPress={onSubmit}
            />
          </DialogButtonWrapper>
        </DialogButtonRow>
      }
    >
      <TextField
        label="학급 코드"
        value={classCode}
        placeholder="ABC-123"
        onChangeText={onChangeClassCode}
        autoCapitalize="characters"
        autoCorrect={false}
        maxLength={7}
        errorMessage={classCodeErrorMessage}
      />

      {classChangeErrorMessage && (
        <Alert
          variant="error"
          title="학급 정보를 불러오지 못했어요"
          description={classChangeErrorMessage}
        />
      )}
    </Dialog>
  );
};

const DialogButtonRow = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
});

const DialogButtonWrapper = styled.View({
  flex: 1,
});
