import { useActionState } from 'react';
import { toast } from 'sonner';

import { MESSAGES } from '@/lib/constants';
// import { revalidateLiveQueries } from '@/lib/live-queries';
import type { Callback } from '@/lib/types';
import { capitalizeFirstLetter } from '@/lib/utils';

type State = void | undefined;

interface Options {
  callbacks?: Callback[];
  initialState: State;
  submitFn: (data?: any) => Promise<void>;
  successMessage?: string;
}

export function useAction({
  callbacks,
  initialState,
  submitFn,
  successMessage,
}: Options) {
  const [state, action, pending] = useActionState(async () => {
    try {
      await submitFn();
      // await revalidateLiveQueries();

      callbacks?.forEach((c) => {
        c();
      });

      if (successMessage) {
        toast.success(successMessage);
      }
    } catch (error) {
      let message: string = MESSAGES.ERROR;

      if (error instanceof Error && error.message) {
        message = error.message;
      }

      toast.error(capitalizeFirstLetter(message));
    }
  }, initialState);

  return [state, action, pending] as [State, Callback, boolean];
}
