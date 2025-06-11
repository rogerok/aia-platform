'use client';
import { createContext, ReactNode, useContext } from 'react';
import { FieldValues } from 'react-hook-form';

import { AnyMobxForm, MobxForm } from '@/lib/form/mobxForm';

const FormContext = createContext<AnyMobxForm | null>(null);

interface FormProviderProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> {
  children: ReactNode;
  methods: MobxForm<TFieldValues, TContext, TTransformedValues>;
}

export const FormProvider = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>(
  props: FormProviderProps<TFieldValues, TContext, TTransformedValues>,
) => {
  return <FormContext value={props.methods}>{props.children}</FormContext>;
};

export const useFormContext = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>(): MobxForm<TFieldValues, TContext, TTransformedValues> => {
  const ctx = useContext(FormContext);
  if (!ctx) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return ctx as MobxForm<TFieldValues, TContext, TTransformedValues>;
};
