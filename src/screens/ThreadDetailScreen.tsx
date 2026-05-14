import styled from '@emotion/native';
import { useCallback, useRef, useState } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, RefreshControl } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { useTeacherWorkStatus } from '@/features/newInquiry/hooks/useTeacherWorkStatus';
import { useThreadDetail, useThreadMessages } from '@/features/threadDetail/queries';
import { useReadThreadRoom, useSendThreadMessage } from '@/features/threadDetail/mutations';
import {
  usePreserveScrollOnLayout,
  useScrollToLatestMessage,
  useThreadRoomReadEffect,
} from '@/features/threadDetail/hooks';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { Header } from '@/components/common/Header';
import { Tag } from '@/components/common/Tag';
import { Loader } from '@/components/common/Loader';
import { SectionErrorState } from '@/components/common/SectionErrorState';
import { SectionEmptyState } from '@/components/common/SectionEmptyState';
import { MessageItem } from '@/components/threadDetail/MessageItem';
import { MessageInputBar } from '@/components/threadDetail/MessageInputBar';
import { TeacherOffNotice } from '@/components/common/TeacherOffNotice';
import { ThreadCompletedNotice } from '@/components/threadDetail/ThreadCompletedNotice';
import type { MainStackParamList } from '@/types/navigation';
import type { ThreadMessageItem } from '@/features/threadDetail/types';
import { INQUIRY_STATUS } from '@/constants/inquiryStatus';
import { MAIN_ROUTES } from '@/navigation/routes';
import { IcChat } from '@/assets/icons';
import { useToastStore } from '@/stores/toastStore';

type ThreadDetailRouteProp = RouteProp<MainStackParamList, typeof MAIN_ROUTES.THREAD_DETAIL>;

const SEND_MESSAGE_ERROR_MESSAGE = '메시지를 전송하지 못했어요. 잠시 후 다시 시도해 주세요.';
const MESSAGE_LIST_TOP_PADDING = 12;
const BANNER_OFFSET = 8;
const BANNER_RESERVED_HEIGHT = 104;

export const ThreadDetailScreen = () => {
  const route = useRoute<ThreadDetailRouteProp>();
  const showToast = useToastStore(state => state.showToast);

  const { chatRoomId } = route.params;

  const [message, setMessage] = useState('');
  const messageListRef = useRef<FlatList<ThreadMessageItem>>(null);

  const { isTeacherOff } = useTeacherWorkStatus();

  const {
    threadDetail,
    isThreadDetailLoading,
    isThreadDetailRefreshing,
    isThreadDetailError,
    refetchThreadDetail,
  } = useThreadDetail(chatRoomId);

  const {
    messages,
    isThreadMessagesLoading,
    isThreadMessagesRefreshing,
    isThreadMessagesError,
    isFetchingNextMessages,
    refetchThreadMessages,
    handleFetchNextPage,
  } = useThreadMessages(chatRoomId);

  const { sendThreadMessage, isSendingThreadMessage } = useSendThreadMessage(chatRoomId);
  const { readThreadRoom } = useReadThreadRoom(chatRoomId);

  const teacherName = threadDetail?.teacherName.trim();

  const isLoading = isThreadDetailLoading || isThreadMessagesLoading;
  const isRefreshing = isThreadDetailRefreshing || isThreadMessagesRefreshing;
  const isError = isThreadDetailError || isThreadMessagesError;
  const isCompleted = threadDetail?.status === INQUIRY_STATUS.COMPLETED;
  const canSendMessage = !isCompleted && message.length > 0 && !isSendingThreadMessage;
  const shouldShowTeacherOffBanner = isTeacherOff && !isCompleted && !isError;
  const shouldShowCompletedBanner = isCompleted && !isError;
  const shouldShowBanner = shouldShowTeacherOffBanner || shouldShowCompletedBanner;

  const { resetReadRoom } = useThreadRoomReadEffect({
    messageCount: messages.length,
    isLoading: isThreadMessagesLoading,
    isError: isThreadMessagesError,
    readThreadRoom,
  });

  const { requestScrollToLatestMessage, cancelScrollToLatestMessage } = useScrollToLatestMessage({
    listRef: messageListRef,
    itemCount: messages.length,
  });

  const { handleScroll: handleMessageListScroll, handleLayout: handleMessageListLayout } =
    usePreserveScrollOnLayout(messageListRef, !isError);

  const handleRefresh = () => {
    resetReadRoom();
    void refetchThreadDetail();
    void refetchThreadMessages();
  };

  const handlePressSend = async () => {
    const messageContent = message;

    if (!canSendMessage) return;

    try {
      requestScrollToLatestMessage();

      await sendThreadMessage(messageContent);
      setMessage('');
    } catch (error) {
      cancelScrollToLatestMessage();
      showToast(getErrorMessage(error, SEND_MESSAGE_ERROR_MESSAGE), 'error');
    }
  };

  const renderMessageItem = useCallback(({ item }: { item: ThreadMessageItem }) => {
    return <MessageItem item={item} />;
  }, []);

  return (
    <ThreadDetailScreenContainer>
      <Header
        hasBackBtn
        title={teacherName ? `${teacherName} 선생님` : '채팅방'}
        metadata={
          threadDetail ? (
            <HeaderTagList>
              <Tag intent={threadDetail.intent} />
              <Tag status={threadDetail.status} />
            </HeaderTagList>
          ) : undefined
        }
      />

      <KeyboardAvoidingContainer behavior="padding">
        <ThreadDetailContent>
          {isError ? (
            <SectionErrorState title="채팅방을 불러오지 못했어요" onRetry={handleRefresh} />
          ) : (
            <>
              <MessageList
                ref={messageListRef}
                data={messages}
                keyExtractor={item => String(item.messageId)}
                renderItem={renderMessageItem}
                onEndReached={handleFetchNextPage}
                onEndReachedThreshold={0.4}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                onTouchStart={Keyboard.dismiss}
                onScroll={handleMessageListScroll}
                onLayout={handleMessageListLayout}
                scrollEventThrottle={16}
                refreshControl={
                  <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
                }
                ListHeaderComponent={
                  isFetchingNextMessages ? <Loader isFullHeight={false} /> : null
                }
                ListEmptyComponent={
                  isLoading ? (
                    <Loader />
                  ) : (
                    <SectionEmptyState
                      icon={IcChat}
                      title="아직 메시지가 없어요"
                      description="메시지를 보내면 이곳에서 대화를 확인할 수 있어요."
                    />
                  )
                }
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingTop: shouldShowBanner ? BANNER_RESERVED_HEIGHT : MESSAGE_LIST_TOP_PADDING,
                  paddingHorizontal: 16,
                  paddingBottom: 12,
                  gap: 16,
                }}
              />

              {shouldShowBanner && (
                <BannerWrapper pointerEvents="box-none">
                  {shouldShowTeacherOffBanner && <TeacherOffNotice />}
                  {shouldShowCompletedBanner && <ThreadCompletedNotice />}
                </BannerWrapper>
              )}
            </>
          )}

          {!isCompleted && !isError && (
            <MessageInputBar
              value={message}
              disabled={isSendingThreadMessage}
              canSend={canSendMessage}
              onChangeText={setMessage}
              onPressSend={handlePressSend}
            />
          )}
        </ThreadDetailContent>
      </KeyboardAvoidingContainer>
    </ThreadDetailScreenContainer>
  );
};

const ThreadDetailScreenContainer = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background.bg1,
}));

const KeyboardAvoidingContainer = styled(KeyboardAvoidingView)({
  flex: 1,
});

const HeaderTagList = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
});

const ThreadDetailContent = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background.bg6,
}));

const MessageList = styled(FlatList<ThreadMessageItem>)({
  flex: 1,
});

const BannerWrapper = styled.View({
  position: 'absolute',
  zIndex: 10,
  top: BANNER_OFFSET,
  right: 16,
  left: 16,
});
