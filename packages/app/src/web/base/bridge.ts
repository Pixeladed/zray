import { Assert } from '@highbeam/utils';
import {
  Bridge,
  BridgeMessage,
  BRIDGE_NAMESPACE,
  MessageParam,
} from '../../interface/bridge';

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
    return impl(...params);
  };
  return result as T;
};

export const requestThroughBridge = async <
  Req extends BridgeMessage,
  Res extends BridgeMessage
>({
  context,
  send,
  data,
  receive,
}: {
  context: Window;
  send: Req;
  data: MessageParam[Req];
  receive: Res;
}) => {
  let finish: (responseData: MessageParam[Res]) => void;

  const promise = new Promise<MessageParam[Res]>(resolve => {
    finish = resolve;
  });
  const bridge = getBridge(context);
  bridge.on(receive, (event, data) => finish(data));
  bridge.invoke(send, data);
  return promise;
};
