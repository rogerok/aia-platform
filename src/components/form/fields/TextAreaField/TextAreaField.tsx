import { ComponentProps, FC, useId } from 'react';

import { Controller } from '@/components/form/Controller/Controller';
import {
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useFormContext } from '@/lib/form/formContext';
import { cn } from '@/lib/utils';

interface TextAreaFieldProps {
  className?: string;
}

interface TextAreaFieldProps
  extends Omit<
    ComponentProps<typeof Textarea>,
    'onChange' | 'readOnly' | 'value'
  > {
  name: string;
  className?: string;
  description?: string;
  label?: string;
}

export const TextAreaField: FC<TextAreaFieldProps> = (props) => {
  const { name, ...rest } = props;
  const { control } = useFormContext();

  const id = useId();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel error={fieldState.error?.message} id={id}>
            {props.label}
          </FormLabel>
          <Textarea
            {...rest}
            {...field}
            aria-invalid={!!fieldState.error?.message}
            className={cn('resize-none', props.className)}
            id={id}
          />
          {props.description && <FormDescription />}
          <FormMessage error={fieldState.error?.message} />
        </FormItem>
      )}
    />
  );
};
