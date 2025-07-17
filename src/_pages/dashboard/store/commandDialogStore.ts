import { makeAutoObservable } from 'mobx';

export class CommandDialogStore {
  open = false;

  constructor() {
    makeAutoObservable(this);
  }

  handleKeyPress = (e: KeyboardEvent): void => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      this.toggle();
    }
  };

  listenToKeyPress = (): void => {
    document.addEventListener('keydown', this.handleKeyPress);
  };

  openDialog = (): void => {
    this.open = true;
  };

  removeEventListener = () => {
    document.removeEventListener('keydown', this.listenToKeyPress);
  };

  setOpen = (open: boolean) => {
    this.open = open;
  };

  toggle = (): void => {
    this.open = !this.open;
  };
}
