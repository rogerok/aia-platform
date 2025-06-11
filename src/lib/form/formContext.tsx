// import { createContext, FC, ReactNode, useContext } from 'react';
// import { FieldValues } from 'react-hook-form';
//
// import { MobxForm } from '@/lib/form/mobxForm';
//
// interface FormProviderProps<
//   TFieldValues extends FieldValues = FieldValues,
//   TContext = any,
//   TTransformedValues = TFieldValues,
// > {
//   children: ReactNode;
//   methods: MobxForm<TFieldValues, TContext, TTransformedValues>;
// }
//
// const createFormContext = <
//   TFieldValues extends FieldValues = FieldValues,
//   TContext = any,
//   TTransformedValues = TFieldValues,
// >() => {
//   const FormContext = createContext<MobxForm<
//     TFieldValues,
//     TContext,
//     TTransformedValues
//   > | null>(null);
//
//   const FormProvider: FC<
//     FormProviderProps<TFieldValues, TContext, TTransformedValues>
//   > = (props) => {
//     return <FormContext value={props.methods}>{props.children}</FormContext>;
//   };
//
//   const useFormContext = (): MobxForm<
//     TFieldValues,
//     TContext,
//     TTransformedValues
//   > => {
//     const ctx = useContext(FormContext);
//     if (!ctx) {
//       throw new Error('useFormContext must be used within a FormProvider');
//     }
//     return ctx;
//   };
//
//   return { FormProvider, useFormContext };
// };
