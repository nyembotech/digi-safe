import { toast } from 'sonner';

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      position: 'top-right',
      duration: 3000,
    });
  },
  error: (message: string) => {
    toast.error(message, {
      position: 'top-right',
      duration: 5000,
    });
  },
  info: (message: string) => {
    toast.info(message, {
      position: 'top-right',
      duration: 3000,
    });
  },
  warning: (message: string) => {
    toast.warning(message, {
      position: 'top-right',
      duration: 4000,
    });
  },
  loading: (message: string) => {
    return toast.loading(message, {
      position: 'top-right',
    });
  }
};