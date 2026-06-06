import styled from '@emotion/native';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/common/Header';
import { Loader } from '@/components/common/Loader';
import { SectionErrorState } from '@/components/common/SectionErrorState';
import { ProfileInfoCard } from '@/components/settings/ProfileInfoCard';
import { ClassManagementCard } from '@/components/settings/ClassManagementCard';
import { TeacherScheduleCard } from '@/components/settings/TeacherScheduleCard';
import { AccountManagementCard } from '@/components/settings/AccountManagementCard';
import { ClassCodeDialog } from '@/components/settings/ClassCodeDialog';
import { ClassChangeConfirmDialog } from '@/components/settings/ClassChangeConfirmDialog';
import { DeleteAccountDialog } from '@/components/settings/DeleteAccountDialog';
import { useLogout } from '@/features/auth/useLogout';
import { useMe } from '@/features/settings/queries/useMe';
import { useParentSetting } from '@/hooks/useParentSetting';
import { useClassChangeFlow, useDeleteAccountFlow } from '@/features/settings/hooks';
import { formatUserDisplayName } from '@/utils/formatUserDisplayName';

export const SettingsScreen = () => {
  const {
    parentSetting,
    classLabel,
    studentName,
    teacherName,
    schedules,
    isParentSettingLoading,
    isParentSettingError,
    refetchParentSetting,
  } = useParentSetting();

  const { me, isMeLoading, isMeError, refetchMe } = useMe();

  const {
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
  } = useClassChangeFlow({
    onChanged: () => {
      void refetchParentSetting();
    },
  });

  const { isLogoutLoading, handleLogout } = useLogout();

  const {
    isDeleteAccountDialogVisible,
    isDeleteAccountLoading,
    handleOpenDeleteAccountDialog,
    handleCloseDeleteAccountDialog,
    handleConfirmDeleteAccount,
  } = useDeleteAccountFlow({
    isDisabled: isLogoutLoading,
  });

  const parentName = me?.name ?? '';

  const isLoading = isParentSettingLoading || isMeLoading;
  const isError = isParentSettingError || isMeError;
  const isAccountActionDisabled = isLogoutLoading || isDeleteAccountLoading;

  const handleRetrySettings = () => {
    void refetchParentSetting();
    void refetchMe();
  };

  if (isLoading) {
    return (
      <SettingsScreenContainer edges={['bottom']}>
        <Header hasBackBtn title="설정" />
        <Loader />
      </SettingsScreenContainer>
    );
  }

  if (isError || !parentSetting || !me) {
    return (
      <SettingsScreenContainer edges={['bottom']}>
        <Header hasBackBtn title="설정" />
        <SectionErrorState title="설정 정보를 불러오지 못했어요" onRetry={handleRetrySettings} />
      </SettingsScreenContainer>
    );
  }

  return (
    <SettingsScreenContainer edges={['bottom']}>
      <Header hasBackBtn title="설정" />

      <SettingsScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20, gap: 16 }}
      >
        <ProfileInfoCard parentName={parentName} />

        <ClassManagementCard
          classLabel={classLabel}
          studentName={studentName}
          teacherName={formatUserDisplayName(parentSetting.teacherName)}
          onPressChange={handleOpenClassCodeDialog}
        />

        <TeacherScheduleCard schedules={schedules} />

        <AccountManagementCard
          disabled={isAccountActionDisabled}
          onPressLogout={handleLogout}
          onPressDeleteAccount={handleOpenDeleteAccountDialog}
        />
      </SettingsScrollView>

      <ClassCodeDialog
        isVisible={isClassCodeDialogVisible}
        classCode={classCode}
        classCodeErrorMessage={classCodeErrorMessage}
        classChangeErrorMessage={classChangeErrorMessage}
        isLoading={isClassChangeLoading}
        isSubmitDisabled={isClassCodeSubmitDisabled}
        onChangeClassCode={handleChangeClassCode}
        onClose={handleCloseClassCodeDialog}
        onSubmit={handlePreviewClassChange}
      />

      <ClassChangeConfirmDialog
        isVisible={isClassConfirmDialogVisible}
        classPreview={classPreview}
        errorMessage={classChangeErrorMessage}
        isChanging={isChangingClass}
        onClose={handleCloseClassConfirmDialog}
        onConfirm={handleConfirmClassChange}
      />

      <DeleteAccountDialog
        isVisible={isDeleteAccountDialogVisible}
        isLoading={isDeleteAccountLoading}
        onClose={handleCloseDeleteAccountDialog}
        onConfirm={handleConfirmDeleteAccount}
      />
    </SettingsScreenContainer>
  );
};

const SettingsScreenContainer = styled(SafeAreaView)({
  flex: 1,
});

const SettingsScrollView = styled(ScrollView)({
  flex: 1,
});
