import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { Dialog } from '@/components/settings/Dialog';
import { IconBadge } from '@/components/common/IconBadge';
import { InlineButton } from '@/components/common/InlineButton';
import { IcError } from '@/assets/icons';

type DeleteAccountDialogProps = {
  isVisible: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const DeleteAccountDialog = ({
  isVisible,
  isLoading,
  onClose,
  onConfirm,
}: DeleteAccountDialogProps) => {
  const theme = useTheme();

  return (
    <Dialog
      isVisible={isVisible}
      title="정말 탈퇴하시겠어요?"
      description={`탈퇴하면 학급 정보와 대화 내역이 모두 삭제되고,\n다시 복구할 수 없어요.`}
      onRequestClose={onClose}
      isDismissible={!isLoading}
      icon={
        <IconBadge
          symbol={IcError}
          bgColor={theme.colors.semantic.errorSoft}
          color={theme.colors.semantic.error}
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
              label="탈퇴하기"
              bgColor={theme.colors.semantic.error}
              activeBgColor={theme.colors.semantic.errorPressed}
              color={theme.colors.text.textW}
              disabled={isLoading}
              onPress={onConfirm}
            />
          </DialogButtonWrapper>
        </DialogButtonRow>
      }
    />
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
