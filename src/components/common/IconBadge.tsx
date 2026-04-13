import styled from '@emotion/native';
import { IconComponent } from '@/types/icon';

type IconProps = {
  symbol: IconComponent;
  size?: number;
  iconSize?: number;
  bgColor?: string;
  color?: string;
};

export const IconBadge = ({
  symbol: Symbol,
  size = 48,
  iconSize = 24,
  bgColor,
  color,
}: IconProps) => {
  return (
    <IconContainer $size={size} $bgColor={bgColor}>
      <Symbol width={iconSize} height={iconSize} color={color} fill={color} />
    </IconContainer>
  );
};

const IconContainer = styled.View<{
  $size?: number;
  $bgColor?: string;
}>(({ $size = 48, $bgColor }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  width: $size,
  height: $size,
  backgroundColor: $bgColor,
  borderRadius: $size / 2,
}));
