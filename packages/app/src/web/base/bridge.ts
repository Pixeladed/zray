import { Assert } from '../../base/assert';
import { Bridge, BRIDGE_NAMESPACE } from '../../interface/bridge';

export const getBridge = (context: Window): Bridge => {
  const key = BRIDGE_NAMESPACE as keyof Window;
  Assert.that(!!context[key], `Bridge ${key} does not exist in context`);
  return context[key] as Bridge;
};

export const withBridge = <T extends (...params: any[]) => any>(
  context: Window,
  factory: (bridge: Bridge) => T
) => {
  const result = (...params: unknown[]) => {
    const bridge = getBridge(context);
    const impl = factory(bridge);
    return impl(params);
  };
  return result as T;
};
