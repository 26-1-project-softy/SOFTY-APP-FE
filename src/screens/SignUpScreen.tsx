import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/common/Header';

export const SignUpScreen = () => {
  return (
    <SignUpScreenContainer edges={['bottom']}>
      <Header hasBackBtn />
      <ContentContainer>
        <ScreenTitle>{`학급 참여 화면`}</ScreenTitle>
      </ContentContainer>
    </SignUpScreenContainer>
  );
};

const SignUpScreenContainer = styled(SafeAreaView)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background.bg4,
}));

const ContentContainer = styled.View({
  flex: 1,
});

const ScreenTitle = styled.Text(({ theme }) => ({
  ...theme.fonts.title3,
  color: theme.colors.text.text1,
}));
