import { useCallback, useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import type { FlatList } from 'react-native';

type UseScrollToLatestMessageParams<T> = {
  listRef: RefObject<FlatList<T> | null>;
  itemCount: number;
};

export const useScrollToLatestMessage = <T>({
  listRef,
  itemCount,
}: UseScrollToLatestMessageParams<T>) => {
  const shouldScrollToEndRef = useRef(false);

  const requestScrollToLatestMessage = useCallback(() => {
    shouldScrollToEndRef.current = true;
  }, []);

  const cancelScrollToLatestMessage = useCallback(() => {
    shouldScrollToEndRef.current = false;
  }, []);

  const scrollToLatestMessage = useCallback(
    (animated = true) => {
      requestAnimationFrame(() => {
        listRef.current?.scrollToEnd({ animated });
      });
    },
    [listRef]
  );

  useEffect(() => {
    if (!itemCount || !shouldScrollToEndRef.current) return;

    shouldScrollToEndRef.current = false;
    scrollToLatestMessage(true);
  }, [itemCount, scrollToLatestMessage]);

  return {
    requestScrollToLatestMessage,
    cancelScrollToLatestMessage,
  };
};
