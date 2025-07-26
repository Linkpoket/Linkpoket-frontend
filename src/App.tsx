import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import Router from './routes/Router';
import RouteChangeTracker from './routes/RouteChangeTracker';

export default function App() {
  RouteChangeTracker();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
