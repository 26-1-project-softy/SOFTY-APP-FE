import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { Dialog } from '@/components/settings/Dialog';
import { IconBadge } from '@/components/common/IconBadge';
import { InlineButton } from '@/components/common/InlineButton';
import { Alert } from '@/components/common/Alert';
import { PreviewClassChangeData } from '@/services/parentSettingApi';
import { IcWarning } from '@/assets/icons';

type ClassChangeConfirmDialogProps = {
  isVisible: boolean;
  classPreview: PreviewClassChangeData | null;
  errorMessage?: string;
  isChanging: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const ClassChangeConfirmDialog = ({
  isVisible,
  classPreview,
  errorMessage,
  isChanging,
  onClose,
  onConfirm,
}: ClassChangeConfirmDialogProps) => {
  const theme = useTheme();

  return (
    <Dialog
      isVisible={isVisible}
      title="학급을 변경할까요?"
      description="학급을 변경하면 기존 학급 연결이 해제되고, 새 학급으로 연결돼요."
      onRequestClose={onClose}
      isDismissible={!isChanging}
      icon={
        <IconBadge
          symbol={IcWarning}
          bgColor={theme.colors.semantic.warningSoft}
          color={theme.colors.semantic.warning}
          iconSize={30}
        />
      }
      footer={
        <DialogFooterContainer>
          {errorMessage && (
            <Alert variant="error" title="학급 변경에 실패했어요" description={errorMessage} />
          )}

          <DialogButtonRow>
            <DialogButtonWrapper>
              <InlineButton
                variant="ghost"
                size="L"
                label="취소"
                disabled={isChanging}
                onPress={onClose}
              />
            </DialogButtonWrapper>

            <DialogButtonWrapper>
              <InlineButton
                variant="primary"
                size="L"
                label="변경하기"
                disabled={isChanging}
                onPress={onConfirm}
              />
            </DialogButtonWrapper>
          </DialogButtonRow>
        </DialogFooterContainer>
      }
    >
      {classPreview && (
        <ClassPreviewBox>
          <ClassPreviewRow>
            <ClassPreviewLabel>학교명</ClassPreviewLabel>
            <ClassPreviewValue>{classPreview.schoolName}</ClassPreviewValue>
          </ClassPreviewRow>

          <ClassPreviewRow>
            <ClassPreviewLabel>학급</ClassPreviewLabel>
            <ClassPreviewValue>
              {classPreview.grade}학년 {classPreview.classNumber}반
            </ClassPreviewValue>
          </ClassPreviewRow>
        </ClassPreviewBox>
      )}
    </Dialog>
  );
};

const ClassPreviewBox = styled.View(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.colors.background.bg4,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: theme.colors.brand.primary,
  paddingVertical: 12,
  paddingHorizontal: 12,
  gap: 12,
}));

const ClassPreviewRow = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 16,
});

const ClassPreviewLabel = styled.Text(({ theme }) => ({
  ...theme.fonts.labelXS,
  color: theme.colors.brand.dark,
}));

const ClassPreviewValue = styled.Text(({ theme }) => ({
  textAlign: 'right',
  flexShrink: 1,
  ...theme.fonts.body2,
  color: theme.colors.text.text1,
}));

const DialogFooterContainer = styled.View({
  gap: 12,
});

const DialogButtonRow = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
});

const DialogButtonWrapper = styled.View({
  flex: 1,
});
