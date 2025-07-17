import { toast } from 'sonner';

import { createDecorator } from '@/lib/decorators/createDecorator';

export const successNotify = (message: string) =>
  createDecorator(async (self, method, ...args) => {
    const result = await method.call(self, ...args);
    toast.success(message);
    return result;
  });
