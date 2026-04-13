import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/common/Header';

export const ThreadDetailScreen = () => {
  return (
    <ThreadDetailScreenContainer edges={['bottom']}>
      <Header hasBackBtn title="학부모 이름" />
      <ContentContainer>
        <ScreenTitle>{`채팅방 화면`}</ScreenTitle>
      </ContentContainer>
    </ThreadDetailScreenContainer>
  );
};

const ThreadDetailScreenContainer = styled(SafeAreaView)(({ theme }) => ({
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
