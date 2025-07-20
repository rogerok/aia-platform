import { IsNumber } from 'class-validator';

interface ListModelArgs<T> {
  items: T[];
  total: number;
  totalPages: number;
}

const defaultValues = {
  items: [],
  total: 0,
  totalPages: 0,
};

export class ListModel<T> {
  items: T[];

  @IsNumber()
  total: number;

  @IsNumber()
  totalPages: number;

  constructor(args: ListModelArgs<T> = defaultValues) {
    this.items = args.items;
    this.total = args.total;
    this.totalPages = args.totalPages;
  }

  hasMore(page: number): boolean {
    return page < this.totalPages;
  }

  isLastPage(page: number): boolean {
    return page >= this.totalPages;
  }

  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  get isNotEmpty(): boolean {
    return !!this.items.length;
  }
}
