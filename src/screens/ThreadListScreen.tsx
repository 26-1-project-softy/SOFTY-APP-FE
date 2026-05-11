import styled from '@emotion/native';
import { useCallback, useRef } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { type ThreadListItem, useThreadList } from '@/features/threadList/hooks/useThreadList';
import { useParentSetting } from '@/hooks/useParentSetting';
import { Header } from '@/components/common/Header';
import { IconButton } from '@/components/common/IconButton';
import { SectionErrorState } from '@/components/common/SectionErrorState';
import { SectionEmptyState } from '@/components/common/SectionEmptyState';
import { ThreadCard } from '@/components/threadList/ThreadCard';
import { Loader } from '@/components/common/Loader';
import type { MainStackParamList } from '@/types/navigation';
import { IcSettings, IcPencil, IcChat } from '@/assets/icons';
import { MAIN_ROUTES } from '@/navigation/routes';

type ThreadListNavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const ThreadListScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ThreadListNavigationProp>();
  const hasFocusedOnceRef = useRef(false);

  const {
    threadList,
    isThreadListLoading,
    isThreadListRefreshing,
    isThreadListError,
    isFetchingNextPage,
    refetchThreadList,
    handleFetchNextPage,
  } = useThreadList();

  const { classLabel, studentName } = useParentSetting();

  useFocusEffect(
    useCallback(() => {
      if (!hasFocusedOnceRef.current) {
        hasFocusedOnceRef.current = true;
        return;
      }

      void refetchThreadList();
    }, [refetchThreadList])
  );

  const headerMetadata = classLabel && studentName ? `${classLabel} · ${studentName}` : '';

  const handlePressSettings = () => {
    navigation.navigate(MAIN_ROUTES.SETTINGS);
  };

  const handlePressCreateInquiry = () => {
    navigation.navigate(MAIN_ROUTES.NEW_INQUIRY);
  };

  const handlePressThread = useCallback(
    (chatRoomId: number) => {
      navigation.navigate(MAIN_ROUTES.THREAD_DETAIL, {
        chatRoomId,
      });
    },
    [navigation]
  );

  const renderThreadItem = useCallback(
    ({ item }: { item: ThreadListItem }) => {
      return <ThreadCard item={item} onPress={() => handlePressThread(item.chatRoomId)} />;
    },
    [handlePressThread]
  );

  return (
    <ThreadListScreenContainer edges={['bottom']}>
      <Header
        title="문의함"
        metadata={
          headerMetadata ? <HeaderMetadataText>{headerMetadata}</HeaderMetadataText> : undefined
        }
        actionIcon={IcSettings}
        onActionPress={handlePressSettings}
        actionAccessibilityLabel="설정 열기"
      />

      {isThreadListError ? (
        <SectionErrorState
          title="문의 목록을 불러오지 못했어요"
          onRetry={() => {
            void refetchThreadList();
          }}
        />
      ) : (
        <ThreadList
          data={threadList}
          keyExtractor={item => String(item.chatRoomId)}
          renderItem={renderThreadItem}
          onEndReached={handleFetchNextPage}
          onEndReachedThreshold={0.4}
          refreshControl={
            <RefreshControl
              refreshing={isThreadListRefreshing}
              onRefresh={() => void refetchThreadList()}
            />
          }
          ListEmptyComponent={
            isThreadListLoading ? (
              <Loader />
            ) : (
              <SectionEmptyState
                icon={IcChat}
                title="아직 문의가 없어요"
                description="새 문의를 작성하면 문의함에서 확인할 수 있어요."
              />
            )
          }
          ListFooterComponent={isFetchingNextPage ? <Loader isFullHeight={false} /> : null}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 16,
            paddingTop: 20,
            paddingBottom: insets.bottom + 96,
            gap: 16,
          }}
        />
      )}

      <FABWrapper style={{ bottom: insets.bottom + 16 }}>
        <IconButton
          icon={IcPencil}
          variant="primary"
          buttonSize={48}
          onPress={handlePressCreateInquiry}
          accessibilityLabel="새 문의 작성"
        />
      </FABWrapper>
    </ThreadListScreenContainer>
  );
};

const ThreadListScreenContainer = styled(SafeAreaView)({
  flex: 1,
});

const HeaderMetadataText = styled.Text(({ theme }) => ({
  ...theme.fonts.body2,
  color: theme.colors.text.text1,
}));

const ThreadList = styled(FlatList<ThreadListItem>)({
  flex: 1,
});

const FABWrapper = styled.View(({ theme }) => ({
  position: 'absolute',
  right: 20,
  borderRadius: 999,

  // 그림자 (iOS)
  shadowColor: theme.colors.text.text1,
  shadowOpacity: 0.2,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 3 },

  // 그림자 (Android)
  elevation: 5,
}));
