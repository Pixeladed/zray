import { Endpoint } from '@highbeam/interface';
import { NextApiHandler } from 'next';

export type ServiceImpl<T> = { [key in keyof T]: Handler<T[key]> };

export type Handler<T> = T extends Endpoint<any, infer Res>
  ? NextApiHandler<Res>
  : never;
