'use client';

import { observer } from 'mobx-react-lite';
import { FormEvent, ReactNode } from 'react';
import { FieldValues } from 'react-hook-form';

import { FormProvider } from '@/lib/form/formContext2';
import { MobxForm } from '@/lib/form/mobxForm';
import { cn } from '@/lib/utils';

interface FormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> {
  children: ReactNode;
  methods: MobxForm<TFieldValues, TContext, TTransformedValues>;
  className?: string;
}

export const Form = observer(
  <
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues = TFieldValues,
  >(
    props: FormProps<TFieldValues, TContext, TTransformedValues>,
  ) => {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      await props.methods.submit();
    };

    return (
      <FormProvider methods={props.methods}>
        <form
          className={cn(props.className)}
          noValidate
          onSubmit={handleSubmit}
        >
          {props.children}
        </form>
      </FormProvider>
    );
  },
);
