import { makeAutoObservable } from 'mobx';

export class CommandDialogStore {
  open = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggle = (): void => {
    this.open = !this.open;
  };

  openDialog = (): void => {
    this.open = true;
  };

  setOpen = (open: boolean) => {
    this.open = open;
  };

  handleKeyPress = (e: KeyboardEvent): void => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      this.toggle();
    }
  };

  listenToKeyPress = (): void => {
    document.addEventListener('keydown', this.handleKeyPress);
  };

  removeEventListener = () => {
    document.removeEventListener('keydown', this.listenToKeyPress);
  };
}
