export const getRendererBridge = <T, K extends string = 'bridge'>(
  context: Window & { [key in K]?: T },
  namespace: K = 'bridge' as K
): T => {
  if (namespace in context) {
    return context[namespace] as T;
  }

  throw new Error(
    `ProcessBridge in namespace ${namespace} does not exist in context`
  );
};
