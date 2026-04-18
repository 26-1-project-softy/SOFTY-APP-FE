import { create } from 'zustand';

export type ToastType = 'success' | 'error';

export type ToastItem = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastState = {
  toasts: ToastItem[];
  showToast: (message: string, type?: ToastType) => void;
  removeToast: (id: number) => void;
  clearToasts: () => void;
};

const TOAST_DURATION = 3000;
const MAX_TOAST_COUNT = 3;

let nextToastId = 0;

const createToastId = () => {
  nextToastId += 1;
  return nextToastId;
};

const toastTimerMap = new Map<number, ReturnType<typeof setTimeout>>();

const clearToastTimer = (id: number) => {
  const timer = toastTimerMap.get(id);

  if (!timer) return;

  clearTimeout(timer);
  toastTimerMap.delete(id);
};

const clearAllToastTimers = () => {
  toastTimerMap.forEach(timer => {
    clearTimeout(timer);
  });

  toastTimerMap.clear();
};

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],

  showToast: (message, type = 'success') => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    const id = createToastId();

    set(state => {
      const nextToasts = [...state.toasts, { id, message: trimmedMessage, type }];

      if (nextToasts.length > MAX_TOAST_COUNT) {
        const removedToast = nextToasts.shift();

        if (removedToast) {
          clearToastTimer(removedToast.id);
        }
      }

      return {
        toasts: nextToasts,
      };
    });

    const timer = setTimeout(() => {
      get().removeToast(id);
    }, TOAST_DURATION);

    toastTimerMap.set(id, timer);
  },

  removeToast: id => {
    clearToastTimer(id);

    set(state => ({
      toasts: state.toasts.filter(toast => toast.id !== id),
    }));
  },

  clearToasts: () => {
    clearAllToastTimers();
    set({ toasts: [] });
  },
}));
