'use client';

import { observer } from 'mobx-react-lite';
import { ComponentProps, FC, useId } from 'react';

import { Controller } from '@/components/form/Controller/Controller';
import {
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from '@/lib/form/formContext';
import { cn } from '@/lib/utils';

type HTMLInputProps = Omit<
  ComponentProps<typeof Input>,
  'onChange' | 'readOnly' | 'value'
>;

interface TextFieldProps extends HTMLInputProps {
  name: string;
  className?: string;
  description?: string;
  label?: string;
}

export const TextField: FC<TextFieldProps> = observer((props) => {
  const { name, type = 'text', ...rest } = props;
  const { control } = useFormContext();
  const id = useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {props.label && (
            <FormLabel error={fieldState.error?.message} id={id}>
              {props.label}
            </FormLabel>
          )}

          <Input
            {...rest}
            {...field}
            aria-invalid={!!fieldState.error?.message}
            className={cn(props.className)}
            id={id}
            type={type}
          />
          {props.description && <FormDescription />}
          <FormMessage error={fieldState.error?.message} />
        </FormItem>
      )}
    />
  );
});
