import { useState } from 'react';
import { useDeleteAccount } from '@/features/auth/useDeleteAccount';

type UseDeleteAccountFlowParams = {
  isDisabled?: boolean;
};

export const useDeleteAccountFlow = ({ isDisabled = false }: UseDeleteAccountFlowParams = {}) => {
  const [isDeleteAccountDialogVisible, setIsDeleteAccountDialogVisible] = useState(false);
  const { isDeleteAccountLoading, handleDeleteAccount } = useDeleteAccount();

  const handleOpenDeleteAccountDialog = () => {
    if (isDisabled || isDeleteAccountLoading) return;

    setIsDeleteAccountDialogVisible(true);
  };

  const handleCloseDeleteAccountDialog = () => {
    if (isDeleteAccountLoading) return;

    setIsDeleteAccountDialogVisible(false);
  };

  const handleConfirmDeleteAccount = async () => {
    const isDeleted = await handleDeleteAccount();

    if (isDeleted) {
      setIsDeleteAccountDialogVisible(false);
    }
  };

  return {
    isDeleteAccountDialogVisible,
    isDeleteAccountLoading,
    handleOpenDeleteAccountDialog,
    handleCloseDeleteAccountDialog,
    handleConfirmDeleteAccount,
  };
};
