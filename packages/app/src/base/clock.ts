export interface Clock {
  now(): number;
}

export const systemClock: Clock = {
  now: () => Date.now(),
};

export class FakeClock implements Clock {
  constructor(private readonly time: number) {}
  now = () => {
    return this.time;
  };
}
