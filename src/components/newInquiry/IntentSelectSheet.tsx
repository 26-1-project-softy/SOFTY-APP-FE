import styled from '@emotion/native';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useMemo, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tag } from '@/components/common/Tag';
import { INQUIRY_INTENT, type InquiryIntentType } from '@/constants/inquiryIntent';

const INTENT_LIST: InquiryIntentType[] = [
  INQUIRY_INTENT.ABSENCE_LATE,
  INQUIRY_INTENT.COUNSELING,
  INQUIRY_INTENT.REQUEST,
  INQUIRY_INTENT.INQUIRY,
];

interface Props {
  visible: boolean;
  onClose: () => void;
  selectedIntent: InquiryIntentType;
  onSelect: (intent: InquiryIntentType) => void;
}

export const IntentSelectSheet = ({ visible, onClose, selectedIntent, onSelect }: Props) => {
  const sheetRef = useRef<BottomSheet>(null);
  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(() => ['35%'], []);

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      pressBehavior="close"
    />
  );

  if (!visible) return null;

  return (
    <BottomSheet
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={onClose}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView>
        <BottomSheetContent $bottomInset={insets.bottom}>
          <BottomSheetHeader>
            <BottomSheetTitle>의도 선택</BottomSheetTitle>
            <BottomSheetDescription>
              선생님께 전달할 문의 유형을 선택해주세요.
            </BottomSheetDescription>
          </BottomSheetHeader>

          <IntentOptionList>
            {INTENT_LIST.map(intent => {
              const isActive = intent === selectedIntent;

              return (
                <IntentOptionButton
                  key={intent}
                  $active={isActive}
                  onPress={() => onSelect(intent)}
                >
                  <Tag intent={intent} />
                </IntentOptionButton>
              );
            })}
          </IntentOptionList>
        </BottomSheetContent>
      </BottomSheetView>
    </BottomSheet>
  );
};

const BottomSheetContent = styled.View<{ $bottomInset: number }>(({ $bottomInset }) => ({
  paddingTop: 24,
  paddingHorizontal: 20,
  paddingBottom: $bottomInset + 24,
  gap: 24,
}));

const BottomSheetHeader = styled.View({
  gap: 10,
});

const BottomSheetTitle = styled.Text(({ theme }) => ({
  ...theme.fonts.labelL,
  color: theme.colors.text.text1,
}));

const BottomSheetDescription = styled.Text(({ theme }) => ({
  ...theme.fonts.body3,
  color: theme.colors.text.text4,
}));

const IntentOptionList = styled.View({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 10,
});

const IntentOptionButton = styled.Pressable<{ $active: boolean }>(({ $active }) => ({
  borderRadius: 999,
  opacity: $active ? 1 : 0.5,
}));
