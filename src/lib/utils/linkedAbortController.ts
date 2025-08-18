export class LinkedAbortController extends AbortController {
  constructor(...abortSignals: (AbortSignal | undefined)[]) {
    super();
  }

  link(...abortSignals: (AbortSignal | undefined)[]) {
    abortSignals.forEach((signal) => {
      signal?.addEventListener('abort', () => {
        this.abort(signal?.reason);
      });
    });
  }
}
