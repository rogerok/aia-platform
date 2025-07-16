import { createDecorator } from '@/lib/decorators/createDecorator';

type KeyBooleanValue = {
  [key: string]: boolean;
};

/*
   - Используем для наследования с абстрактным классом abstract class Loadable
   - Используем для имплементации с интерфейсом ILoadable
   Данный тип декоратора удобен для индикации загрузки нескольких полей
 */
export interface ILoadable<T> {
  loading: T;
  setLoading(key: keyof T, value: boolean): void;
}

export abstract class Loadable<T> implements ILoadable<T> {
  loading: T;

  protected constructor() {
    this.loading = {} as T;
  }

  setLoading(key: keyof T, value: boolean) {
    (this.loading as KeyBooleanValue)[key as string] = value;
  }
}

export const loadable = <T>(keyLoading: keyof T) =>
  createDecorator<ILoadable<T>>(async (self, method, ...args) => {
    try {
      if (self.loading[keyLoading]) return;
      self.setLoading(keyLoading, true);
      return await method.call(self, ...args);
    } finally {
      self.setLoading(keyLoading, false);
    }
  });

export const simpleLoadable = () =>
  createDecorator<any>(async (self, method, ...args) => {
    if (self.isLoading) return;
    self.isLoading = true;
    try {
      return await method.call(self, ...args);
    } finally {
      self.isLoading = false;
    }
  });
