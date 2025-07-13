import { makeAutoObservable } from 'mobx';

export class BooleanToggleStore {
  readonly initialValue: boolean;

  constructor(public value: boolean) {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );

    this.initialValue = value;
  }

  setValue(value: boolean): void {
    this.value = value;
  }

  setFalse(): void {
    this.value = false;
  }

  setTrue(): void {
    this.value = true;
  }

  toggle(): void {
    this.value = !this.value;
  }

  reset(): void {
    this.value = this.initialValue;
  }
}
