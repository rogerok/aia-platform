import { TRPCError } from '@trpc/server';
import { plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';

const formatErrors = (errors: ValidationError[]): string => {
  const flatten = (errs: ValidationError[]): string[] => {
    return errs.flatMap((e) => {
      const msgs = Object.values(e.constraints || {});
      const children = flatten(e.children || []);
      return [...msgs, ...children];
    });
  };

  return flatten(errors).join(', ');
};
const validateOne = <T>(val: T) =>
  validateSync(val as object, {
    forbidNonWhitelisted: true,
    whitelist: true,
  });

const validateInput = <T>(instance: T | T[]): ValidationError[] => {
  if (Array.isArray(instance)) {
    return instance.map(validateOne).flat();
  }

  return validateOne(instance);
};

export const processInput = <T>(cls: new () => T, data: unknown): T => {
  const instance = plainToInstance(cls, data);
  const errors = validateInput(instance);

  if (errors.length) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: formatErrors(errors),
    });
  }

  return instance;
};
