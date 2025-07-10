import { plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';

const getErrorsMessage = (errors: ValidationError[]): string => {
  return errors
    .map((e) => Object.values(e.constraints || {}).join(', '))
    .join(', ');
};

const validateInput = <T>(instance: T): ValidationError[] => {
  return validateSync(instance as object, {
    forbidNonWhitelisted: true,
    whitelist: true,
  });
};

export const processInput = <T>(cls: new () => T, data: unknown): T => {
  const instance = plainToInstance(cls, data);

  const errors = validateInput(instance);

  if (errors.length) {
    throw new Error(getErrorsMessage(errors));
  }

  return instance;
};
