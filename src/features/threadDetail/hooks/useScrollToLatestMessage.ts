import { useCallback, useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { InteractionManager } from 'react-native';
import type { FlatList } from 'react-native';

type UseScrollToLatestMessageParams<T> = {
  listRef: RefObject<FlatList<T> | null>;
  itemCount: number;
  isReady: boolean;
};

export const useScrollToLatestMessage = <T>({
  listRef,
  itemCount,
  isReady,
}: UseScrollToLatestMessageParams<T>) => {
  const hasInitialScrolledRef = useRef(false);
  const shouldScrollToLatestRef = useRef(false);

  const scrollToLatestMessage = useCallback(
    (animated = true) => {
      InteractionManager.runAfterInteractions(() => {
        requestAnimationFrame(() => {
          listRef.current?.scrollToEnd({ animated });
        });
      });
    },
    [listRef]
  );

  const requestScrollToLatestMessage = useCallback(() => {
    shouldScrollToLatestRef.current = true;
  }, []);

  const cancelScrollToLatestMessage = useCallback(() => {
    shouldScrollToLatestRef.current = false;
  }, []);

  const resetLatestMessageScrollState = useCallback(() => {
    hasInitialScrolledRef.current = false;
    shouldScrollToLatestRef.current = false;
  }, []);

  const handleContentSizeChange = useCallback(() => {
    if (!isReady || itemCount === 0) return;

    if (!hasInitialScrolledRef.current) {
      hasInitialScrolledRef.current = true;
      shouldScrollToLatestRef.current = false;
      scrollToLatestMessage(false);
      return;
    }

    if (!shouldScrollToLatestRef.current) return;

    shouldScrollToLatestRef.current = false;
    scrollToLatestMessage(true);
  }, [isReady, itemCount, scrollToLatestMessage]);

  useEffect(() => {
    if (!isReady || itemCount === 0) return;

    if (!hasInitialScrolledRef.current) {
      scrollToLatestMessage(false);
    }
  }, [isReady, itemCount, scrollToLatestMessage]);

  return {
    requestScrollToLatestMessage,
    cancelScrollToLatestMessage,
    resetLatestMessageScrollState,
    handleContentSizeChange,
    scrollToLatestMessage,
  };
};
