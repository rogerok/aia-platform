import 'client-only';
import { makeAutoObservable, runInAction } from 'mobx';

type SuccessResult<T> = { data: T; status: 'success' };
type ErrorResult = { data: null; error: any; status: 'error' };
type LoadingResult = { data: null; status: 'loading' };
type IdleResult = { data: null; status: 'idle' };

type Result<T> = ErrorResult | IdleResult | LoadingResult | SuccessResult<T>;
type ExecuteResult<T> = ErrorResult | SuccessResult<T>;

export class RequestStore<T, Args extends any[] = []> {
  result: Result<T> = { data: null, status: 'idle' };

  constructor(private fetchFn: (...args: Args) => Promise<T>) {
    makeAutoObservable<this, 'fetchFn'>(
      this,
      { fetchFn: false },
      { autoBind: true },
    );
  }

  execute = async (...args: Args): Promise<ExecuteResult<T>> => {
    this.result = { data: null, status: 'loading' };

    try {
      const data = await this.fetchFn(...args);
      runInAction(() => {
        this.result = { data, status: 'success' };
      });
    } catch (error) {
      runInAction(() => {
        this.result = { data: null, error, status: 'error' };
      });
    }

    return this.result as unknown as ExecuteResult<T>;
  };

  get isLoading() {
    return this.result.status === 'loading';
  }

  get isSuccess() {
    return this.result.status === 'success';
  }
}
