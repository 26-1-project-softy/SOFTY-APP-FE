import styled from '@emotion/native';
import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/common/Header';
import { SettingsSectionCard } from '@/components/settings/SettingsSectionCard';
import { useLogout } from '@/features/auth/useLogout';

export const SettingsScreen = () => {
  const { isLogoutLoading, handleLogout } = useLogout();

  const handleDeleteAccount = () => {
    console.log('회원 탈퇴');
  };

  return (
    <SafeAreaView edges={['bottom']}>
      <Header hasBackBtn title="설정" />

      <SettingsContentContainer>
        <SettingsSectionCard title="계정">
          <AccountActionList>
            <Pressable
              onPress={handleLogout}
              disabled={isLogoutLoading}
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
              onPress={handleDeleteAccount}
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
