import { Assert } from '../../base/assert';

export const getRendererBridge = (context: Window) => {
  const bridge = context.RendererBridge;
  Assert.that(!!bridge, 'RendererBridge does not exist in context');
  return bridge;
};
