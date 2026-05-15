import styled from '@emotion/native';
import type { ReactNode } from 'react';
import { Modal, Pressable } from 'react-native';

type DialogProps = {
  isVisible: boolean;
  title: string;
  description?: string;
  icon: ReactNode;
  footer: ReactNode;
  children?: ReactNode;
  onRequestClose: () => void;
  isDismissible: boolean;
};

export const Dialog = ({
  isVisible,
  title,
  description,
  icon,
  footer,
  children,
  onRequestClose,
  isDismissible = true,
}: DialogProps) => {
  const handleClose = () => {
    if (!isDismissible) return;
    onRequestClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <DialogOverlay onPress={handleClose}>
        <DialogCard onPress={event => event.stopPropagation()}>
          <DialogContentSection>
            {icon}
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogContentSection>

          {children && <DialogBodySection>{children}</DialogBodySection>}

          <DialogFooterSection>{footer}</DialogFooterSection>
        </DialogCard>
      </DialogOverlay>
    </Modal>
  );
};

const DialogOverlay = styled(Pressable)({
  flex: 1,
  justifyContent: 'center',
  paddingHorizontal: 24,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

const DialogCard = styled(Pressable)(({ theme }) => ({
  borderRadius: 16,
  backgroundColor: theme.colors.background.bg1,
  paddingHorizontal: 20,
  paddingVertical: 20,
  gap: 40,
}));

const DialogContentSection = styled.View({
  alignItems: 'center',
  gap: 16,
});

const DialogTitle = styled.Text(({ theme }) => ({
  ...theme.fonts.labelM,
  color: theme.colors.text.text1,
  textAlign: 'center',
}));

const DialogDescription = styled.Text(({ theme }) => ({
  ...theme.fonts.body2,
  color: theme.colors.text.text1,
  textAlign: 'center',
}));

const DialogBodySection = styled.View({
  gap: 16,
});

const DialogFooterSection = styled.View({
  gap: 12,
});
