import styled from '@emotion/native';
import { Pressable } from 'react-native';

type RadioButtonProps = {
  label: string;
  isSelected: boolean;
  onPress: () => void;
};

export const RadioButton = ({ label, isSelected, onPress }: RadioButtonProps) => {
  return (
    <RadioBtnContainer
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected: isSelected }}
    >
      <RadioOuterCircle $isSelected={isSelected}>
        {isSelected && <RadioInnerCircle />}
      </RadioOuterCircle>

      <RadioLabel>{label}</RadioLabel>
    </RadioBtnContainer>
  );
};

const RadioBtnContainer = styled(Pressable)({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
});

const RadioOuterCircle = styled.View<{
  $isSelected: boolean;
}>(({ theme, $isSelected }) => ({
  width: 20,
  height: 20,
  borderRadius: 16,
  borderWidth: 1,
  alignItems: 'center',
  justifyContent: 'center',
  borderColor: $isSelected ? theme.colors.brand.primary : theme.colors.text.text1,
}));

const RadioInnerCircle = styled.View(({ theme }) => ({
  width: 13,
  height: 13,
  borderRadius: 999,
  backgroundColor: theme.colors.brand.primary,
}));

const RadioLabel = styled.Text(({ theme }) => ({
  ...theme.fonts.body2,
  color: theme.colors.text.text1,
}));
