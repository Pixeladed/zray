export const getRendererBridge = <T>(context: Window, namespace: string): T => {
  if (namespace in context) {
    return context[namespace as keyof typeof context] as T;
  }

  throw new Error(
    `ProcessBridge in namespace ${namespace} does not exist in context`
  );
};
