import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/common/Header';

export const SettingsScreen = () => {
  return (
    <SettingsScreenContainer edges={['bottom']}>
      <Header hasBackBtn title="설정" />
      <ContentContainer>
        <ScreenTitle>{`설정 화면`}</ScreenTitle>
      </ContentContainer>
    </SettingsScreenContainer>
  );
};

const SettingsScreenContainer = styled(SafeAreaView)(({ theme }) => ({
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
