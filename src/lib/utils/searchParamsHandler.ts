'use client';

import { instanceToPlain, plainToInstance } from 'class-transformer';
import { makeAutoObservable } from 'mobx';
import { makeLoggable } from 'mobx-log';

import { BaseQueryParamsModel } from '@/lib/models/paramsModel';

export class SearchParamsHandler<T extends BaseQueryParamsModel> {
  cls: new () => T;

  params: T;

  constructor(cls: new () => T) {
    this.cls = cls;
    this.params = this.getPlain();

    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
    makeLoggable(this);
  }

  getParam<K extends keyof T>(key: K): T[K] {
    return this.params[key];
  }

  getPlain(): T {
    const params = Object.fromEntries(
      new URLSearchParams(window.location.search),
    );

    return instanceToPlain(
      plainToInstance(this.cls, params, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      }),
    ) as T;
  }

  pushHistory(params: string) {
    window.history.pushState({}, '', window.location.pathname + '?' + params);
  }

  replaceHref(href: string) {
    window.location.href = href;
  }

  setParam<K extends keyof T>(key: K, value: T[K]) {
    this.params[key] = value;
  }

  setQueryParams(params: T, withRefresh: boolean = true) {
    this.params = params;

    const searchParams = new URLSearchParams();

    Object.keys(this.params).forEach((key) => {
      const value = this.params[key as keyof T];

      if (value === null || value === undefined) {
        return;
      } else {
        searchParams.append(key, value.toString());
      }
    });

    if (withRefresh) {
      this.replaceHref(
        window.location.pathname + '?' + searchParams.toString(),
      );
    } else {
      this.pushHistory(searchParams.toString());
    }
  }
}
