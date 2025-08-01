/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { LinkedAbortController } from 'linked-abort-controller';
import {
  action,
  comparer,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import { BaseSyntheticEvent } from 'react';
import {
  Control,
  createFormControl,
  DeepMap,
  DeepPartial,
  DefaultValues,
  FieldErrors,
  FieldValues,
  FormState,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormClearErrors,
  UseFormProps,
  UseFormRegister,
  UseFormReset,
  UseFormResetField,
  UseFormSetError,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormTrigger,
  UseFormUnregister,
} from 'react-hook-form';

export type AnyMobxForm = MobxForm<any, any, any>;

enableStaticRendering(typeof window === 'undefined');

/**
 * Additional options for {@link MobxForm} constructor
 */
export interface MobxFormParams<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> extends Omit<
    UseFormProps<TFieldValues, TContext, TTransformedValues>,
    'defaultValues'
  > {
  /**
   * Abort controller for mobx form
   */
  abortController?: AbortController;
  /**
   * Async is not supported
   */
  defaultValues?: DeepPartial<TFieldValues>;
  /**
   * lazy mobx form state updates using requestAnimationFrame
   * @default - {true}
   */
  lazyUpdates?: boolean;
  /**
   * Form submit handler
   */
  onSubmit?: SubmitHandler<TTransformedValues>;
  /**
   * Form submit failed handler
   */
  onSubmitFailed?: SubmitErrorHandler<TFieldValues>;
  /**
   * Form reset handler
   */
  onReset?: (event: any) => void;
}

export type ExtractFormFieldValues<T extends AnyMobxForm> = Exclude<
  T['values'],
  null | undefined
>;

export type ExtractFormFieldOutputValues<T extends AnyMobxForm> =
  T extends MobxForm<any, any, infer TFieldOutputValues>
    ? TFieldOutputValues
    : never;

type FormFullState<TFieldValues extends FieldValues> = {
  values: TFieldValues;
} & FormState<TFieldValues>;

export class MobxForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> implements FormFullState<TFieldValues>
{
  protected abortController: AbortController | undefined;
  clearErrors: UseFormClearErrors<TFieldValues>;
  control: Control<TFieldValues, TContext, TTransformedValues>;
  /**
   * If you want to change this property
   * Use {resetForm} method
   */
  defaultValues!: Readonly<DefaultValues<TFieldValues>>;
  dirtyFields: Partial<Readonly<DeepMap<DeepPartial<TFieldValues>, boolean>>> =
    {};
  disabled: boolean = false;
  errors: FieldErrors<TFieldValues> = {};
  isDirty: boolean = false;
  isLoading: boolean = false;
  isReady: boolean = false;
  isSubmitSuccessful: boolean = false;
  isSubmitted: boolean = false;
  isSubmitting: boolean = false;
  isValid: boolean = false;
  isValidating: boolean = false;
  protected lastRafId: number | undefined;
  originalForm: ReturnType<
    typeof createFormControl<TFieldValues, TContext, TTransformedValues>
  >;
  register: UseFormRegister<TFieldValues>;
  resetField: UseFormResetField<TFieldValues>;

  resetForm: UseFormReset<TFieldValues>;

  setError: UseFormSetError<TFieldValues>;

  setFocus: UseFormSetFocus<TFieldValues>;

  setValue: UseFormSetValue<TFieldValues>;

  submitCount: number = 0;

  submitSuccessful = false;

  submitted = false;

  /**
   * Custom properties for async control form's submitting state - submitting,submitted, submitSuccessful,
   */
  submitting: boolean = false;

  touchedFields: Partial<
    Readonly<DeepMap<DeepPartial<TFieldValues>, boolean>>
  > = {};

  trigger: UseFormTrigger<TFieldValues>;

  unregister: UseFormUnregister<TFieldValues>;

  validatingFields: Partial<
    Readonly<DeepMap<DeepPartial<TFieldValues>, boolean>>
  > = {};

  values!: TFieldValues;

  constructor(
    private config: MobxFormParams<TFieldValues, TContext, TTransformedValues>,
  ) {
    this.abortController = config.abortController;

    this.originalForm = createFormControl<
      TFieldValues,
      TContext,
      TTransformedValues
    >({
      ...config,
      defaultValues: {
        ...config.defaultValues,
      } as DefaultValues<TFieldValues>,
    });

    this.setError = this.originalForm.setError;
    this.clearErrors = this.originalForm.clearErrors;
    this.trigger = this.originalForm.trigger;
    this.resetField = this.originalForm.resetField;
    this.unregister = this.originalForm.unregister;
    this.control = this.originalForm.control;
    this.register = this.originalForm.register;
    this.setFocus = this.originalForm.setFocus;
    this.setValue = this.originalForm.setValue;
    this.resetForm = this.originalForm.reset;

    Object.assign(this, {
      defaultValues: config.defaultValues
        ? { ...config.defaultValues }
        : ({} as any),
      values: this.originalForm.getValues(),
    });

    const subscription = this.originalForm.subscribe({
      callback: (rawFormState) => {
        if (this.config.lazyUpdates === false) {
          this.updateFormState(rawFormState);
        } else {
          if (this.lastRafId !== undefined) {
            cancelAnimationFrame(this.lastRafId);
            this.lastRafId = undefined;
          }
          this.lastRafId = requestAnimationFrame(() => {
            this.updateFormState(rawFormState);
            this.lastRafId = undefined;
          });
        }
      },
      formState: {
        dirtyFields: true,
        errors: true,
        isDirty: true,
        isValid: true,
        isValidating: true,
        touchedFields: true,
        validatingFields: true,
        values: true,
      },
    });

    observable.deep(this, 'values');
    observable.ref(this, 'isDirty');
    observable.ref(this, 'isLoading');
    observable.ref(this, 'isSubmitted');
    observable.ref(this, 'isSubmitSuccessful');
    observable.ref(this, 'isSubmitting');
    observable.ref(this, 'isValidating');
    observable.ref(this, 'isValid');
    observable.ref(this, 'disabled');
    observable.ref(this, 'submitCount');
    observable.ref(this, 'isReady');
    observable.ref(this, 'submitting');
    observable.ref(this, 'submitted');
    observable.ref(this, 'submitSuccessful');
    observable.deep(this, 'defaultValues');
    observable.deep(this, 'dirtyFields');
    observable.deep(this, 'touchedFields');
    observable.deep(this, 'validatingFields');
    observable.deep(this, 'errors');
    action(this, 'updateFormState');

    observable.ref(this, 'originalForm');
    action.bound(this, 'submit');
    action.bound(this, 'reset');

    makeObservable(this);

    this.abortController?.signal.addEventListener('abort', () => {
      subscription();
      // @ts-ignore
      this.originalForm = null;
      // @ts-ignore
      this.data = null;
    });
  }

  destroy(): void {
    this.abortController?.abort?.();
    if (this.lastRafId !== undefined) {
      cancelAnimationFrame(this.lastRafId);
    }
  }

  reset(e?: BaseSyntheticEvent) {
    this.resetForm();
    this.config.onReset?.(e);
  }
  setFormSubmitSuccessful(successful: boolean): void {
    this.submitSuccessful = successful;
  }

  setFormSubmitted(submitted: boolean): void {
    this.submitted = submitted;
  }

  setFormSubmitting(submitting: boolean): void {
    this.submitting = submitting;
  }

  submit(e?: BaseSyntheticEvent) {
    this.setFormSubmitting.bind(this)(true);
    this.setFormSubmitted(false);
    this.setFormSubmitSuccessful(false);

    return new Promise<TTransformedValues>((resolve, reject) => {
      this.originalForm.handleSubmit(
        async (data, event) => {
          await this.config.onSubmit?.(data, event);
          resolve(data);

          runInAction(() => this.setFormSubmitSuccessful(true));
        },
        async (errors, event) => {
          await this.config.onSubmitFailed?.(errors, event);
          reject(errors);

          runInAction(() => this.setFormSubmitSuccessful(false));
        },
      )(e);
    }).finally(() => {
      runInAction(() => {
        this.setFormSubmitting(false);
        this.setFormSubmitted(true);
      });
    });
  }

  private updateFormState({
    errors,
    values,
    ...simpleProperties
  }: Partial<FormFullState<TFieldValues>>) {
    Object.entries(simpleProperties).forEach(([key, value]) => {
      if (value != null) {
        // @ts-ignore
        this[key] = value;
      }
    });

    if (errors) {
      const currentErrorsSet = new Set(Object.keys(this.errors));
      const newErrors = Object.keys(errors);

      for (const errorField of newErrors) {
        if (currentErrorsSet.has(errorField)) {
          currentErrorsSet.delete(errorField);
          if (
            !comparer.structural(this.errors[errorField], errors[errorField])
          ) {
            // @ts-ignore
            Object.assign(this.errors[errorField], errors[errorField]);
          }
        } else {
          // @ts-ignore
          this.errors[errorField] = errors[errorField];
        }
      }

      currentErrorsSet.forEach((errorField) => {
        // @ts-ignore
        delete this.errors[errorField];
      });
    } else {
      this.errors = {};
    }

    // @ts-ignore
    this.values = values ?? {};
  }
}
