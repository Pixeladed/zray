export class ManualPromise<T> extends Promise<T> {
  resolve!: (data: T) => void;
  reject!: (reason: any) => void;

  constructor() {
    super((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
