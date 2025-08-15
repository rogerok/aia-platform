export type ObjectValues<T> = T[keyof T];

export type MaybeFn<T, TArgs extends any[] = []> = ((...args: TArgs) => T) | T;

export type Nullable<T> = T | null;

export type Maybe<T> = Nullable<T> | undefined;
