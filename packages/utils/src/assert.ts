export class Assert {
  static that = (
    expr: boolean,
    msg: string = 'Expected expression to be true'
  ) => {
    if (expr) {
      return;
    }

    throw new AssertError(msg);
  };

  static exists = <T>(
    val: T | undefined | null,
    msg: string = 'Expected value to exist'
  ): T => {
    Assert.that(val != null, msg);
    return val as T;
  };
}

export class AssertError extends Error {
  name = 'AssertError';
}
