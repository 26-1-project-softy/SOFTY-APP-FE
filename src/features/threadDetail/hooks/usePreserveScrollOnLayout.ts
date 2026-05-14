import { type RefObject, useCallback, useRef } from 'react';
import {
  FlatList,
  Platform,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

export const usePreserveScrollOnLayout = <T>(
  listRef: RefObject<FlatList<T> | null>,
  enabled = true
) => {
  const currentScrollYRef = useRef(0);
  const listHeightRef = useRef(0);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    currentScrollYRef.current = event.nativeEvent.contentOffset.y;
  }, []);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const nextListHeight = event.nativeEvent.layout.height;
      const prevListHeight = listHeightRef.current;

      listHeightRef.current = nextListHeight;

      if (!enabled || Platform.OS !== 'android' || prevListHeight === 0) return;

      const heightDiff = prevListHeight - nextListHeight;

      if (heightDiff === 0) return;

      const nextOffset = Math.max(currentScrollYRef.current + heightDiff, 0);

      currentScrollYRef.current = nextOffset;

      requestAnimationFrame(() => {
        listRef.current?.scrollToOffset({
          offset: nextOffset,
          animated: false,
        });
      });
    },
    [enabled, listRef]
  );

  return {
    handleScroll,
    handleLayout,
  };
};
