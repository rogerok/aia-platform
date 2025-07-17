import { createDecorator } from '@/lib/decorators/createDecorator';
import { BooleanToggleStore } from '@/lib/stores/booleanToggleStore';

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

/*
 Используется если нужно тогглить только одно поле.
 Возможно стоит добавить метод setLoading в тип т.к. mobx требует мутирования через action
 */

interface ISimpleLoadable {
  isLoading: boolean;
}

export const simpleLoadable = <T extends ISimpleLoadable>() =>
  createDecorator<T>(async (self, method, ...args) => {
    if (self.isLoading) return;
    self.isLoading = true;
    try {
      return await method.call(self, ...args);
    } finally {
      self.isLoading = false;
    }
  });

/*
  Можно использовать BooleanToggleStore
 */

interface ILoadableByToggleStore {
  loading: BooleanToggleStore;
}

export const loadableByToggleStore = <T extends ILoadableByToggleStore>() =>
  createDecorator<T>(async (self, method, ...args) => {
    if (self.loading.value) {
      return;
    }
    self.loading.setTrue();
    try {
      return await method.call(self, ...args);
    } finally {
      self.loading.setFalse();
    }
  });

/*
  Динамически указывать название поля
 */

type KeysOfType<T, V> = {
  // мапаемся по типу и проверяем соответствие
  [K in keyof T]: T[K] extends V ? K : never;
  //  забираем ключи как union тип
}[keyof T];

export const loadableByField = <T, K extends KeysOfType<T, BooleanToggleStore>>(
  key: K,
) =>
  createDecorator<T>(async (self, method, ...args) => {
    const toggle = self[key] as BooleanToggleStore;

    if (toggle.value) {
      return;
    }

    toggle.setTrue();
    try {
      return await method.call(self, ...args);
    } finally {
      toggle.setFalse();
    }
  });
