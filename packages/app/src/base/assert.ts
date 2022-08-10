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
}

export class AssertError extends Error {
  name = 'AssertError';
}
