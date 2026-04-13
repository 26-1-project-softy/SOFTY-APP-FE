import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/common/Header';

export const NewInquiryScreen = () => {
  return (
    <NewInquiryScreenContainer edges={['bottom']}>
      <Header hasBackBtn title="새 문의 작성" />
      <ContentContainer>
        <ScreenTitle>{`새 문의 작성 화면`}</ScreenTitle>
      </ContentContainer>
    </NewInquiryScreenContainer>
  );
};

const NewInquiryScreenContainer = styled(SafeAreaView)(({ theme }) => ({
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
