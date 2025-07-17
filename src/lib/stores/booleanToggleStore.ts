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

  reset(): void {
    this.value = this.initialValue;
  }

  setFalse(): void {
    this.value = false;
  }

  setTrue(): void {
    this.value = true;
  }

  setValue(value: boolean): void {
    this.value = value;
  }

  toggle(): void {
    this.value = !this.value;
  }
}
