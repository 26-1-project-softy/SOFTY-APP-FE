import styled from '@emotion/native';
import type { Theme } from '@emotion/react';
import { useTheme } from '@emotion/react';
import { IcError, IcInfo } from '@/assets/icons';
import { InlineButton } from '@/components/common/InlineButton';

type AlertVariant = 'error' | 'warning' | 'success';

type AlertVariantStyle = {
  backgroundColor: string;
  borderColor: string;
  contentColor: string;
};

type AlertProps = {
  title: string;
  description?: string;
  variant?: AlertVariant;
  onRetry?: () => void;
};

export const Alert = ({ title, description, variant = 'error', onRetry }: AlertProps) => {
  const theme = useTheme();
  const styles = getAlertVariantStyle(theme, variant);

  const Icon = variant === 'success' ? IcInfo : IcError;

  return (
    <AlertContainer $styles={styles}>
      <AlertContentContainer>
        <Icon width={18} height={18} color={styles.contentColor} />

        <AlertTextContainer>
          <AlertTitle $color={styles.contentColor}>{title}</AlertTitle>

          {description && (
            <AlertDescription $color={styles.contentColor}>{description}</AlertDescription>
          )}
        </AlertTextContainer>
      </AlertContentContainer>

      {onRetry && <InlineButton variant="ghost" size="M" label="다시 시도" onPress={onRetry} />}
    </AlertContainer>
  );
};

const getAlertVariantStyle = (theme: Theme, variant: AlertVariant): AlertVariantStyle => {
  if (variant === 'error') {
    return {
      backgroundColor: theme.colors.semantic.errorSoft,
      borderColor: theme.colors.semantic.error,
      contentColor: theme.colors.semantic.error,
    };
  }

  if (variant === 'warning') {
    return {
      backgroundColor: theme.colors.semantic.warningSoft,
      borderColor: theme.colors.semantic.warning,
      contentColor: theme.colors.semantic.warning,
    };
  }

  return {
    backgroundColor: theme.colors.semantic.successSoft,
    borderColor: theme.colors.semantic.success,
    contentColor: theme.colors.semantic.success,
  };
};

const AlertContainer = styled.View<{ $styles: AlertVariantStyle }>(({ $styles }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderWidth: 1,
  borderRadius: 16,
  paddingVertical: 12,
  paddingHorizontal: 16,
  gap: 10,
  borderColor: $styles.borderColor,
  backgroundColor: $styles.backgroundColor,
}));

const AlertContentContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  flex: 1,
});

const AlertTextContainer = styled.View({
  flex: 1,
  gap: 4,
});

const AlertTitle = styled.Text<{ $color: string }>(({ theme, $color }) => ({
  ...theme.fonts.labelXS,
  color: $color,
}));

const AlertDescription = styled.Text<{ $color: string }>(({ theme, $color }) => ({
  ...theme.fonts.caption,
  color: $color,
}));
