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
  const hasReadRoomRef = useRef(false);

  useEffect(() => {
    if (!messageCount || isLoading || isError || hasReadRoomRef.current) {
      return;
    }

    hasReadRoomRef.current = true;

    readThreadRoom().catch(error => {
      if (__DEV__) {
        console.log('채팅방 읽음 처리 실패', error);
      }
    });
  }, [messageCount, isLoading, isError, readThreadRoom]);

  const resetReadRoom = () => {
    hasReadRoomRef.current = false;
  };

  return {
    resetReadRoom,
  };
};
