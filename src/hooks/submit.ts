import { useRouter } from '@tanstack/react-router';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { MESSAGES } from '@/lib/constants';
import type { Callback } from '@/lib/types';
import { capitalizeFirstLetter } from '@/lib/utils';

export interface Options {
  callbacks?: Callback[];
  submitFn: (data?: any) => Promise<void>;
  successMessage?: string;
}

interface Payload {
  submitting: boolean;
  onSubmit: (data?: any) => Promise<void>;
}

export function useSubmit(options: Options): Payload {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { callbacks, submitFn, successMessage = '' } = options;

  async function handler(data?: any) {
    startTransition(async () => {
      try {
        await submitFn(data);
        router.invalidate();

        for (const c of callbacks || []) {
          c();
        }

        if (successMessage) {
          toast.success(successMessage);
        }
      } catch (error: unknown) {
        let message: string = MESSAGES.ERROR;

        if (error instanceof Error && error.message) {
          message = error.message;
        }

        toast.error(capitalizeFirstLetter(message));
      }
    });
  }

  return {
    onSubmit: handler,
    submitting: pending,
  };
}
