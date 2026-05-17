import styled from '@emotion/native';
import { Pressable } from 'react-native';
import { SectionCard } from '@/components/common/SectionCard';

type AccountManagementCardProps = {
  disabled: boolean;
  onPressLogout: () => void;
  onPressDeleteAccount: () => void;
};

export const AccountManagementCard = ({
  disabled,
  onPressLogout,
  onPressDeleteAccount,
}: AccountManagementCardProps) => {
  return (
    <SectionCard title="계정 관리">
      <AccountActionButtonList>
        <Pressable
          onPress={onPressLogout}
          disabled={disabled}
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
          onPress={onPressDeleteAccount}
          disabled={disabled}
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
      </AccountActionButtonList>
    </SectionCard>
  );
};

const AccountActionButtonList = styled.View({
  paddingVertical: 8,
  gap: 8,
});

const AccountActionButton = styled.View<{
  $pressed: boolean;
}>(({ theme, $pressed }) => ({
  width: '100%',
  paddingHorizontal: 20,
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
