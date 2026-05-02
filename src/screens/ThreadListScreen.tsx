import styled from '@emotion/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Header } from '@/components/common/Header';
import { IconButton } from '@/components/common/IconButton';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainStackParamList } from '@/types/navigation';
import { IcSettings, IcPencil } from '@/assets/icons';
import { MAIN_ROUTES } from '@/navigation/routes';

type ThreadListNavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const ThreadListScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ThreadListNavigationProp>();

  const handlePressSettings = () => {
    navigation.navigate(MAIN_ROUTES.SETTINGS);
  };

  const handlePressCreateInquiry = () => {
    navigation.navigate(MAIN_ROUTES.NEW_INQUIRY);
  };

  return (
    <ThreadListScreenContainer edges={['bottom']}>
      <Header
        title="문의함"
        actionIcon={IcSettings}
        onActionPress={handlePressSettings}
        actionAccessibilityLabel="설정 열기"
      />

      <ThreadListContentContainer>
        <ScreenTitle>{`문의함 화면`}</ScreenTitle>
      </ThreadListContentContainer>

      <FABWrapper style={{ bottom: insets.bottom + 16 }}>
        <IconButton
          icon={IcPencil}
          variant="primary"
          buttonSize={48}
          onPress={handlePressCreateInquiry}
          accessibilityLabel="새 문의 작성"
        />
      </FABWrapper>
    </ThreadListScreenContainer>
  );
};

const ThreadListScreenContainer = styled(SafeAreaView)({
  flex: 1,
});

const ThreadListContentContainer = styled.View({
  flex: 1,
});

const ScreenTitle = styled.Text(({ theme }) => ({
  ...theme.fonts.title3,
  color: theme.colors.text.text1,
}));

const FABWrapper = styled.View(({ theme }) => ({
  position: 'absolute',
  right: 20,
  borderRadius: 999,

  // 그림자 (iOS)
  shadowColor: theme.colors.text.text1,
  shadowOpacity: 0.2,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 3 },

  // 그림자 (Android)
  elevation: 5,
}));
