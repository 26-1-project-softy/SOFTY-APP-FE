import styled from '@emotion/native';

type LoaderProps = {
  isFullHeight?: boolean;
};

export const Loader = ({ isFullHeight = true }: LoaderProps) => {
  return (
    <LoaderContainer $isFullHeight={isFullHeight}>
      <LoaderText>불러오는 중...</LoaderText>
    </LoaderContainer>
  );
};

const LoaderContainer = styled.View<{ $isFullHeight: boolean }>(({ $isFullHeight }) => ({
  flex: $isFullHeight ? 1 : 0,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  paddingVertical: 16,
}));

const LoaderText = styled.Text(({ theme }) => ({
  ...theme.fonts.caption,
  color: theme.colors.text.text2,
}));
