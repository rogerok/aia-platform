'use client';

import { plainToInstance } from 'class-transformer';
import { makeAutoObservable } from 'mobx';
import { makeLoggable } from 'mobx-log';

import { BaseQueryParamsModel } from '@/lib/models/paramsModel';

export class SearchParamsHandler<T extends BaseQueryParamsModel> {
  cls: new () => T;

  params: T = this.getPlain();

  constructor(cls: new () => T) {
    this.cls = cls;

    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
    makeLoggable(this);
  }

  getPlain(): T {
    const params = Object.fromEntries(
      new URLSearchParams(window.location.search),
    );

    return plainToInstance(this.cls, params, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });
  }

  setParam<K extends keyof T>(key: K, value: T[K]) {
    this.params[key] = value;
  }

  setQueryParams(params: T) {
    const searchParams = new URLSearchParams();

    Object.keys(params).forEach((key) => {
      const value = params[key as keyof T];

      if (value === null || value === undefined) {
        return;
      } else {
        searchParams.append(key, value.toString());
      }
    });

    window.history.pushState(
      {},
      '',
      window.location.pathname + '?' + searchParams.toString(),
    );
  }
}
