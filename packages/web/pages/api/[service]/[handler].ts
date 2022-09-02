import { NextApiRequest, NextApiResponse } from 'next';
import { config } from '../../../base/config';
import { createGmailService } from '../../../services/gmail/create';
import { createGoogleDriveService } from '../../../services/google_drive/create';
import { createSlackService } from '../../../services/slack/create';

const { gmailService } = createGmailService(config.gmail);
const { googleDriveService } = createGoogleDriveService(config.googleDrive);
const { slackService } = createSlackService(config.slack);

const routeMap = {
  gmail: gmailService,
  google_drive: googleDriveService,
  slack: slackService,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { service: serviceQuery, handler: handlerQuery } = req.query;

  const serviceName = serviceQuery?.toString();
  const handlerName = handlerQuery?.toString();

  if (!serviceName) {
    throw new Error('no service provided');
  }

  if (!handlerName) {
    throw new Error('no handler provided');
  }

  const service =
    serviceName in routeMap
      ? routeMap[serviceName as keyof typeof routeMap]
      : undefined;

  if (!service) {
    throw new Error('invalid service');
  }

  const handler =
    handlerName in service
      ? service[handlerName as keyof typeof service]
      : undefined;

  if (!handler) {
    throw new Error('invalid handler');
  }

  return handler(req, res);
}
