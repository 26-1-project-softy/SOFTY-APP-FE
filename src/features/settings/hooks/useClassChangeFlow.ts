import { useState } from 'react';
import { useChangeClass } from '@/features/settings/mutations';
import { getPreviewClassErrorMessage } from '@/features/settings/utils/getPreviewClassErrorMessage';
import { getErrorMessage } from '@/utils/getErrorMessage';
import {
  getClassCodeErrorMessage,
  getNormalizedClassCode,
  validateClassCode,
} from '@/utils/classCodeUtils';
import { useToastStore } from '@/stores/toastStore';

type UseClassChangeFlowParams = {
  onChanged?: () => void;
};

const CHANGE_CLASS_ERROR_MESSAGE = '학급 변경에 실패했어요. 잠시 후 다시 시도해 주세요.';

export const useClassChangeFlow = ({ onChanged }: UseClassChangeFlowParams = {}) => {
  const showToast = useToastStore(state => state.showToast);

  const [isClassCodeDialogVisible, setIsClassCodeDialogVisible] = useState(false);
  const [isClassConfirmDialogVisible, setIsClassConfirmDialogVisible] = useState(false);
  const [classCode, setClassCode] = useState('');
  const [classChangeErrorMessage, setClassChangeErrorMessage] = useState('');

  const {
    previewClassChange,
    changeClass,
    classPreview,
    isPreviewingClassChange,
    isChangingClass,
    resetClassPreview,
  } = useChangeClass();

  const classCodeErrorMessage = getClassCodeErrorMessage(classCode);
  const isClassCodeValid = validateClassCode(classCode);
  const isClassChangeLoading = isPreviewingClassChange || isChangingClass;
  const isClassCodeSubmitDisabled = !isClassCodeValid || isClassChangeLoading;

  const resetClassChangeFlow = () => {
    setClassCode('');
    setClassChangeErrorMessage('');
    resetClassPreview();
  };

  const handleOpenClassCodeDialog = () => {
    resetClassChangeFlow();
    setIsClassCodeDialogVisible(true);
  };

  const handleCloseClassCodeDialog = () => {
    if (isClassChangeLoading) return;

    setIsClassCodeDialogVisible(false);
    resetClassChangeFlow();
  };

  const handleChangeClassCode = (value: string) => {
    setClassCode(getNormalizedClassCode(value).slice(0, 7));
    setClassChangeErrorMessage('');
  };

  const handlePreviewClassChange = async () => {
    if (!isClassCodeValid || isClassChangeLoading) return;

    try {
      await previewClassChange({ classCode });

      setClassChangeErrorMessage('');
      setIsClassCodeDialogVisible(false);
      setIsClassConfirmDialogVisible(true);
    } catch (error) {
      setClassChangeErrorMessage(getPreviewClassErrorMessage(error));
    }
  };

  const handleCloseClassConfirmDialog = () => {
    if (isChangingClass) return;

    setIsClassConfirmDialogVisible(false);
    setClassChangeErrorMessage('');
    resetClassPreview();
  };

  const handleConfirmClassChange = async () => {
    if (!classPreview || isChangingClass) return;

    try {
      await changeClass({
        classCode: classPreview.classCode,
      });

      onChanged?.();

      showToast('학급이 변경되었어요.', 'success');
      setIsClassConfirmDialogVisible(false);
      resetClassChangeFlow();
    } catch (error) {
      setClassChangeErrorMessage(getErrorMessage(error, CHANGE_CLASS_ERROR_MESSAGE));
    }
  };

  return {
    classCode,
    classPreview,
    classCodeErrorMessage,
    classChangeErrorMessage,
    isClassCodeDialogVisible,
    isClassConfirmDialogVisible,
    isClassChangeLoading,
    isChangingClass,
    isClassCodeSubmitDisabled,
    handleOpenClassCodeDialog,
    handleCloseClassCodeDialog,
    handleChangeClassCode,
    handlePreviewClassChange,
    handleCloseClassConfirmDialog,
    handleConfirmClassChange,
  };
};
