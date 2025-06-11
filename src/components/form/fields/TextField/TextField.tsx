import { observer } from 'mobx-react-lite';
import { ComponentProps, FC } from 'react';

import { Controller } from '@/components/form/Controller/Controller';
import { Input } from '@/components/ui/input';
import { useFormContext } from '@/lib/form/formContext2';
import { cn } from '@/lib/utils';

type HTMLInputProps = Omit<
  ComponentProps<typeof Input>,
  'onChange' | 'readOnly' | 'value'
>;

interface TextFieldProps extends HTMLInputProps {
  name: string;
  className?: string;
}

export const TextField: FC<TextFieldProps> = observer((props) => {
  const { name, type = 'text', ...rest } = props;
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Input
          {...rest}
          {...field}
          className={cn(props.className)}
          type={type}
        />
      )}
    />
  );
});
