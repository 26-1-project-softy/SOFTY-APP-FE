import styled from '@emotion/native';
import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/common/Header';
import { SettingsSectionCard } from '@/components/settings/SettingsSectionCard';
import { Dialog } from '@/components/settings/Dialog';
import { IconBadge } from '@/components/common/IconBadge';
import { InlineButton } from '@/components/common/InlineButton';
import { useLogout } from '@/features/auth/useLogout';
import { useDeleteAccount } from '@/features/auth/useDeleteAccount';
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { IcError } from '@/assets/icons';

export const SettingsScreen = () => {
  const theme = useTheme();
  const [isDeleteAccountDialogVisible, setIsDeleteAccountDialogVisible] = useState(false);

  const { isLogoutLoading, handleLogout } = useLogout();
  const { isDeleteAccountLoading, handleDeleteAccount } = useDeleteAccount();

  const isAccountActionDisabled = isLogoutLoading || isDeleteAccountLoading;

  const handleOpenDeleteAccountDialog = () => {
    if (isAccountActionDisabled) return;

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

  return (
    <SafeAreaView edges={['bottom']}>
      <Header hasBackBtn title="설정" />

      <SettingsContentContainer>
        <SettingsSectionCard title="계정 관리">
          <AccountActionList>
            <Pressable
              onPress={handleLogout}
              disabled={isAccountActionDisabled}
              accessibilityRole="button"
              accessibilityLabel="로그아웃"
            >
              {({ pressed }) => (
                <AccountActionButton $pressed={pressed}>
                  <AccountActionLabel $pressed={pressed} $isDestructive={false}>
                    로그아웃
                  </AccountActionLabel>
                </AccountActionButton>
              )}
            </Pressable>

            <Pressable
              onPress={handleOpenDeleteAccountDialog}
              disabled={isAccountActionDisabled}
              accessibilityRole="button"
              accessibilityLabel="회원 탈퇴"
              android_ripple={{ color: 'rgba(0, 0, 0, 0.06)' }}
              hitSlop={4}
            >
              {({ pressed }) => (
                <AccountActionButton $pressed={pressed}>
                  <AccountActionLabel $pressed={pressed} $isDestructive>
                    회원 탈퇴
                  </AccountActionLabel>
                </AccountActionButton>
              )}
            </Pressable>
          </AccountActionList>
        </SettingsSectionCard>
      </SettingsContentContainer>

      <Dialog
        isVisible={isDeleteAccountDialogVisible}
        title="정말 탈퇴하시겠어요?"
        description={`탈퇴하면 학급 정보와 대화 내역이 모두 삭제되고,\n다시 복구할 수 없어요.`}
        onRequestClose={handleCloseDeleteAccountDialog}
        isDismissible={!isDeleteAccountLoading}
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
                disabled={isDeleteAccountLoading}
                onPress={handleCloseDeleteAccountDialog}
              />
            </DialogButtonWrapper>

            <DialogButtonWrapper>
              <InlineButton
                variant="primary"
                size="L"
                label="탈퇴하기"
                bgColor={theme.colors.semantic.error}
                color={theme.colors.text.textW}
                disabled={isDeleteAccountLoading}
                onPress={handleConfirmDeleteAccount}
              />
            </DialogButtonWrapper>
          </DialogButtonRow>
        }
      />
    </SafeAreaView>
  );
};

const SettingsContentContainer = styled.View({
  paddingHorizontal: 16,
  paddingVertical: 20,
});

const AccountActionList = styled.View({
  gap: 8,
});

const AccountActionButton = styled.View<{
  $pressed: boolean;
}>(({ theme, $pressed }) => ({
  width: '100%',
  paddingHorizontal: 16,
  paddingVertical: 8,
  backgroundColor: $pressed ? theme.colors.background.bg3 : theme.colors.background.bg1,
}));

const AccountActionLabel = styled.Text<{
  $pressed: boolean;
  $isDestructive: boolean;
}>(({ theme, $pressed, $isDestructive }) => ({
  ...theme.fonts.body2,
  color: $isDestructive ? theme.colors.semantic.error : theme.colors.text.text1,
  opacity: $pressed ? 0.7 : 1,
}));

const DialogButtonRow = styled.View({
  flexDirection: 'row',
  gap: 10,
});

const DialogButtonWrapper = styled.View({
  flex: 1,
});
