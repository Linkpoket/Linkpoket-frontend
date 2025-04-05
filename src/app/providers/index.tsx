import { withErrorBoundary } from 'react-error-boundary';
import { ErrorHandler, logError } from '@/shared/ui/error-handler';
import {
  Spinner,
  // spinnerModel
} from '@/shared/ui/Spinner';
import { QueryClientProvider } from './QueryClientProvider';
import Router from './Router';

export const Provider = withErrorBoundary(
  () => (
    <>
      <GlobalSpinner />
      <QueryClientProvider>
        <Router />
      </QueryClientProvider>
    </>
  ),
  {
    FallbackComponent: ErrorHandler,
    onError: logError,
  }
);

function GlobalSpinner() {
  //   const display = spinnerModel.globalSpinner.use.display();

  return (
    <Spinner
      //   display={display}
      position="bottom-right"
    />
  );
}
