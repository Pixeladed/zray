import { Assert } from './assert';

export const getBridge = <T>(context: Window, namespace: string): T => {
  const key = namespace as keyof Window;
  Assert.that(!!context[key], `Bridge ${namespace} does not exist in context`);
  return context[key] as T;
};
