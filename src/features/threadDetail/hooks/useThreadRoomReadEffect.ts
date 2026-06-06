import { useEffect, useRef } from 'react';

type UseThreadRoomReadEffectParams = {
  messageCount: number;
  isLoading: boolean;
  isError: boolean;
  readThreadRoom: () => Promise<unknown>;
};

export const useThreadRoomReadEffect = ({
  messageCount,
  isLoading,
  isError,
  readThreadRoom,
}: UseThreadRoomReadEffectParams) => {
  const lastReadMessageCountRef = useRef(0);
  const isReadingRoomRef = useRef(false);

  useEffect(() => {
    if (!messageCount || isLoading || isError || isReadingRoomRef.current) {
      return;
    }

    if (lastReadMessageCountRef.current === messageCount) {
      return;
    }

    lastReadMessageCountRef.current = messageCount;
    isReadingRoomRef.current = true;

    readThreadRoom()
      .catch(error => {
        if (__DEV__) {
          console.log('채팅방 읽음 처리 실패', error);
        }
      })
      .finally(() => {
        isReadingRoomRef.current = false;
      });
  }, [messageCount, isLoading, isError, readThreadRoom]);

  const resetReadRoom = () => {
    lastReadMessageCountRef.current = 0;
  };

  return {
    resetReadRoom,
  };
};
