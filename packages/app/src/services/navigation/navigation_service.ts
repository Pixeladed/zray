export class NavigationService {
  constructor(private readonly window: Window) {}

  currentHref = () => {
    return this.window.location.href;
  };
}
