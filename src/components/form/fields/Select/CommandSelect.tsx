'use client';

import { ChevronsUpDownIcon } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { FC, ReactNode, useState } from 'react';

import { Loader } from '@/components/custom/Loader/Loader';
import { Controller } from '@/components/form/Controller/Controller';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext } from '@/lib/form/formContext';
import { BooleanToggleStore } from '@/lib/stores/booleanToggleStore';
import { cn } from '@/lib/utils';

interface CommandSelectProps {
  name: string;
  options: { children: ReactNode; id: string; value: string }[];
  value: string;
  className?: string;
  label?: string;
  loading?: boolean;
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export const CommandSelect: FC<CommandSelectProps> = observer((props) => {
  const {
    className,
    label,
    loading,
    name,
    onSearch,
    options,
    placeholder = 'Select an option',
    value,
  } = props;

  const [open] = useState(() => new BooleanToggleStore(false));

  const { control } = useFormContext();

  const selectedOption = options.find((option) => option.value === value);
  return (
    <>
      {label && <FormLabel>{label}</FormLabel>}

      <Button
        className={cn(
          'j h-9 justify-between px-2 font-normal',
          !selectedOption && 'text-muted-foreground',
          className,
        )}
        onClick={open.toggle}
        type={'button'}
        variant={'outline'}
      >
        <div>{selectedOption?.children ?? placeholder}</div>

        <ChevronsUpDownIcon />
      </Button>

      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <>
            <CommandDialog
              onOpenChange={open.setValue}
              open={open.value}
              shouldFilter={!onSearch}
            >
              <CommandInput
                disabled={loading}
                onValueChange={onSearch}
                placeholder={'Search...'}
              />
              <CommandList>
                {!options.length && !loading && (
                  <CommandEmpty>
                    <span className={'text-muted-foreground text-sm'}>
                      No options found
                    </span>
                  </CommandEmpty>
                )}
                {loading ? (
                  <Loader />
                ) : (
                  options.map((option) => (
                    <CommandItem
                      key={option.id}
                      onSelect={() => {
                        field.onChange(option.value);
                        open.setFalse();
                      }}
                    >
                      {option.children}
                    </CommandItem>
                  ))
                )}
              </CommandList>
            </CommandDialog>
            <FormMessage error={fieldState.error?.message} />
          </>
        )}
      />
    </>
  );
});
