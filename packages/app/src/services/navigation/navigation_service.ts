export class NavigationService {
  constructor(private readonly window: Window) {}

  openNewPage = (url: string) => {
    const proxy = this.window.open(url, '_blank');
    if (!proxy) {
      throw new Error(`Could not open new ${url}`);
    }

    return proxy as WindowProxy;
  };

  currentHref = () => {
    return this.window.location.href;
  };
}
