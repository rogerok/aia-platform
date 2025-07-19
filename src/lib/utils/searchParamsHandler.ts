'use client';

import { plainToInstance } from 'class-transformer';

import { BaseQueryParamsModel } from '@/lib/models/paramsModel';

export class SearchParamsHandler<T extends BaseQueryParamsModel> {
  cls: new () => T;

  params: T;

  constructor(cls: new () => T) {
    this.cls = cls;
  }

  getPlain(): T | undefined {
    const params = Object.fromEntries(
      new URLSearchParams(window.location.search),
    );

    return plainToInstance(this.cls, params, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });
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
