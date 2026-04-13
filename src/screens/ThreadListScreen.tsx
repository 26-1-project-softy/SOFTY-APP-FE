import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/common/Header';
import { IcSettings } from '@/assets/icons';

export const ThreadListScreen = () => {
  const handlePressSettings = () => {
    // TODO: 설정 화면 이동
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
  backgroundColor: theme.colors.background.bg2,
}));

const ContentContainer = styled.View({
  flex: 1,
});

const ScreenTitle = styled.Text(({ theme }) => ({
  ...theme.fonts.title3,
  color: theme.colors.text.text1,
}));
