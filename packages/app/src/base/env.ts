import { Assert } from '@highbeam/utils';

export const env = (label: string) => {
  return Assert.exists(process.env[label], `expected config ${label} to exist`);
};
