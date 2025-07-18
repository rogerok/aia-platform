export class UnknownError extends Error {
  constructor(error: unknown) {
    super('Unexpected error');
    this.name = this.constructor.name;
  }
}
