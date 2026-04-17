import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/common/Header';
import { IcSettings } from '@/assets/icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '@/types/navigation';
import { MAIN_ROUTES } from '@/navigation/routes';

type ThreadListNavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const ThreadListScreen = () => {
  const navigation = useNavigation<ThreadListNavigationProp>();

  const handlePressSettings = () => {
    navigation.navigate(MAIN_ROUTES.SETTINGS);
  };

  return (
    <ThreadListScreenContainer edges={['bottom']}>
      <Header
        title="문의함"
        actionIcon={IcSettings}
        onActionPress={handlePressSettings}
        actionAccessibilityLabel="설정 열기"
      />
      <ContentContainer>
        <ScreenTitle>{`문의함 화면`}</ScreenTitle>
      </ContentContainer>
    </ThreadListScreenContainer>
  );
};

const ThreadListScreenContainer = styled(SafeAreaView)(({ theme }) => ({
  flex: 1,
}));

const ContentContainer = styled.View({
  flex: 1,
});

const ScreenTitle = styled.Text(({ theme }) => ({
  ...theme.fonts.title3,
  color: theme.colors.text.text1,
}));
