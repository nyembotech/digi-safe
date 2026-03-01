import { QueryClient } from '@tanstack/react-query';
import { showToast } from './toast';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
      onError: (error) => {
        if (error instanceof Error) {
          showToast.error(`Query error: ${error.message}`);
        }
      },
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        if (error instanceof Error) {
          showToast.error(`Mutation error: ${error.message}`);
        }
      },
    },
  },
});