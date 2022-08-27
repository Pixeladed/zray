import { EndpointReq, EndpointRes } from 'services/base';
import fetch from 'cross-fetch';
import { IServiceMap, IServices, Services } from 'services';

export class Client<T extends IServices> {
  constructor(
    private readonly apiOrigin: string,
    private readonly serviceName: string
  ) {}

  call = async <K extends keyof T>(
    methodName: K,
    data: EndpointReq<T[K]>
  ): Promise<EndpointRes<T[K]>> => {
    const url = this.url(methodName);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  };

  url = <K extends keyof T>(methodName: K) => {
    const url = new URL(this.apiOrigin);
    if (typeof methodName === 'symbol') {
      throw new Error('symbol method names are not supported');
    }

    url.pathname = `/api/${this.serviceName}/${methodName as string}`;
    return url;
  };
}

export interface IClient<T extends IServices> {
  call: <K extends keyof T>(
    methodName: K,
    data: EndpointReq<T[K]>
  ) => Promise<EndpointRes<T[K]>>;
  url: <K extends keyof T>(methodName: K) => URL;
}

export class ClientFactory {
  constructor(private readonly apiOrigin: string) {}

  for = <K extends Services>(name: K): Client<IServiceMap[K]> => {
    return new Client(this.apiOrigin, name);
  };
}
