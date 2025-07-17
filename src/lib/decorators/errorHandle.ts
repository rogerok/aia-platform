import { toast } from 'sonner';

import { createDecorator } from '@/lib/decorators/createDecorator';

export const errorHandle = (message?: string) =>
  createDecorator(async (self, method, ...args) => {
    try {
      return await method.call(self, ...args);
    } catch (err) {
      const errText =
        message || (err instanceof Error ? err.message : String(err));
      toast.error(errText);
      console.error(errText);
    }
  });
