import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InlineButton } from '@/components/common/InlineButton';
import { IconBadge } from '@/components/common/IconBadge';
import { useKakaoLogin } from '@/features/auth/useKakaoLogin';
import { IcBrandLogo, IcKakao, IcLink, IcSparkles } from '@/assets/icons';
import { BADGE_BG_BRAND, BADGE_ICON_BRAND } from '@/constants/iconBadge';

const COPYRIGHT_TEXT = '© 2026, SOFTY All rights reserved.';

const loginFeatureList = [
  {
    key: 'join-class',
    title: '학급 코드로 간편하게 참여',
    description: '간단한 정보와 학급 코드를 입력하면 바로\n선생님과 연결할 수 있어요.',
    icon: IcLink,
  },
  {
    key: 'intent-analysis',
    title: 'AI 문의 의도 분석',
    description: '보내기 전 AI가 문의 의도를 분석해줘요.\n필요하면 문의 의도를 수정할 수 있어요.',
    icon: IcSparkles,
  },
] as const;

export const LoginScreen = () => {
  const theme = useTheme();
  const { isKakaoLoginLoading, handleKakaoLogin } = useKakaoLogin();

  return (
    <LoginSafeArea edges={['top', 'bottom']}>
      <LoginScreenContainer>
        <ContentContainer>
          <BrandSection>
            <IcBrandLogo width={80} height={80} />
            <BrandTitle>{`SOFTY`}</BrandTitle>
            <BrandDescription>{`선생님과 학부모를 잇는\n학급 소통 공간`}</BrandDescription>
          </BrandSection>

          <FeatureSection>
            {loginFeatureList.map(feature => {
              const FeatureIcon = feature.icon;

              return (
                <FeatureCard key={feature.key}>
                  <IconBadge
                    symbol={FeatureIcon}
                    bgColor={BADGE_BG_BRAND}
                    color={BADGE_ICON_BRAND}
                  />

                  <FeatureCopySection>
                    <FeatureTitleText>{feature.title}</FeatureTitleText>
                    <FeatureDescriptionText>{feature.description}</FeatureDescriptionText>
                  </FeatureCopySection>
                </FeatureCard>
              );
            })}
          </FeatureSection>

          <LoginActionSection>
            <InlineButton
              variant="primary"
              size="L"
              label="카카오로 로그인"
              bgColor={theme.colors.kakao.primary}
              activeBgColor={theme.colors.kakao.active}
              color={theme.colors.text.text1}
              icon={IcKakao}
              disabled={isKakaoLoginLoading}
              onPress={handleKakaoLogin}
            />

            <PolicyNoticeText>
              로그인 시 서비스 이용약관 및 개인정보 처리방침에 동의하게 됩니다.
            </PolicyNoticeText>
          </LoginActionSection>
        </ContentContainer>

        <CopyrightText>{COPYRIGHT_TEXT}</CopyrightText>
      </LoginScreenContainer>
    </LoginSafeArea>
  );
};

const LoginSafeArea = styled(SafeAreaView)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background.bg1,
}));

const LoginScreenContainer = styled.View({
  flex: 1,
  paddingHorizontal: 16,
  gap: 60,
});

const ContentContainer = styled.View({
  flex: 1,
  justifyContent: 'space-between',
  marginTop: 80,
});

const BrandSection = styled.View({
  alignItems: 'center',
  gap: 8,
});

const BrandTitle = styled.Text(({ theme }) => ({
  ...theme.fonts.title1,
  color: theme.colors.brand.primary,
  textAlign: 'center',
}));

const BrandDescription = styled.Text(({ theme }) => ({
  ...theme.fonts.body2,
  color: theme.colors.text.text1,
  textAlign: 'center',
}));

const FeatureSection = styled.View({
  gap: 10,
});

const FeatureCard = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingVertical: 12,
  gap: 16,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: theme.colors.border.border1,
}));

const FeatureCopySection = styled.View({
  flex: 1,
  gap: 10,
});

const FeatureTitleText = styled.Text(({ theme }) => ({
  ...theme.fonts.labelS,
  color: theme.colors.text.text1,
}));

const FeatureDescriptionText = styled.Text(({ theme }) => ({
  ...theme.fonts.body2,
  color: theme.colors.text.text1,
}));

const LoginActionSection = styled.View({
  gap: 20,
});

const PolicyNoticeText = styled.Text(({ theme }) => ({
  ...theme.fonts.caption,
  color: theme.colors.text.text4,
  textAlign: 'center',
}));

const CopyrightText = styled.Text(({ theme }) => ({
  ...theme.fonts.caption,
  color: theme.colors.text.text4,
  textAlign: 'center',
  marginBottom: 40,
}));
