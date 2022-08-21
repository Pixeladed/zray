import got from 'got';

export class Network {
  constructor(private readonly apiOrigin: string) {}

  post = async <Res>(path: string, body?: any): Promise<Res> => {
    const url = this.url(path);
    const data = await got.post(url, { json: body }).json<Res>();
    return data;
  };

  url = (path: string) => {
    const url = new URL(this.apiOrigin);
    url.pathname = `/api/${path}`;
    return url;
  };
}
