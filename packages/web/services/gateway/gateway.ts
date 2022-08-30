import { NextApiHandler } from 'next';

export const gatewayFor = <T extends {}>(service: T) => {
  const handler: NextApiHandler = (req, res) => {
    const method = req.query.method;

    if (typeof method !== 'string') {
      throw new Error('invalid method');
    }

    if (!(method in service)) {
      throw new Error(`service does not have method ${method}`);
    }

    const member = service[method as keyof T];

    if (typeof member !== 'function') {
      throw new Error('invalid method');
    }

    return member(req, res);
  };

  return handler;
};
