import styled from '@emotion/native';
import type { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from '@/components/common/IconButton';
import { IconComponent } from '@/types/icon';
import { IcBack } from '@/assets/icons';

interface HeaderProps {
  hasBackBtn?: boolean;
  title?: string;
  metadata?: ReactNode;
  actionIcon?: IconComponent;
  onBackPress?: () => void;
  onActionPress?: () => void;
  isActionDisabled?: boolean;
  actionAccessibilityLabel?: string;
}

export const Header = ({
  hasBackBtn = false,
  title,
  metadata,
  actionIcon,
  onBackPress,
  onActionPress,
  isActionDisabled,
  actionAccessibilityLabel,
}: HeaderProps) => {
  const navigate = useNavigation();
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }

    if (navigate.canGoBack()) {
      navigate.goBack();
    }
  };

  return (
    <HeaderContainer
      style={{
        paddingTop: insets.top + 16,
        height: 60 + insets.top,
      }}
    >
      <HeaderLeadingGroup>
        {hasBackBtn && (
          <IconButton
            icon={IcBack}
            variant="plain"
            onPress={handleBackPress}
            accessibilityLabel={'뒤로가기'}
          />
        )}

        {title && <HeaderTitle numberOfLines={1}>{title}</HeaderTitle>}
      </HeaderLeadingGroup>

      {(metadata || actionIcon) && (
        <HeaderTrailingGroup>
          {metadata && <HeaderMetadata>{metadata}</HeaderMetadata>}
          {actionIcon && (
            <IconButton
              icon={actionIcon}
              variant="plain"
              disabled={isActionDisabled}
              onPress={onActionPress}
              accessibilityLabel={actionAccessibilityLabel}
            />
          )}
        </HeaderTrailingGroup>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  padding: 16,
  backgroundColor: theme.colors.background.bg1,
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.border.border1,
}));

const HeaderLeadingGroup = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  flexShrink: 1,
});

const HeaderTrailingGroup = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: 'auto',
  flexShrink: 0,
});

const HeaderTitle = styled.Text(({ theme }) => ({
  ...theme.fonts.labelM,
  color: theme.colors.text.text1,
  flexShrink: 1,
}));

const HeaderMetadata = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
});
