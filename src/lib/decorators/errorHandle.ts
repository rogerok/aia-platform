import { toast } from 'sonner';

import { createDecorator } from '@/lib/decorators/createDecorator';

export const errorHandle = (title?: string, description?: string) =>
  createDecorator(async (self, method, ...args) => {
    try {
      return await method.call(self, ...args);
    } catch (err) {
      const errTitle = title || 'Error';
      const errDescription =
        description || (err instanceof Error ? err.message : String(err));
      toast.error(errTitle);
      console.error(`${errTitle} ${errDescription}`);
    }
  });
