import { IServiceMap, Services } from '@highbeam/interface';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { config } from '../../../base/config';
import { ServiceImpl } from '../../../base/service';
import { createAuthService } from '../../../services/auth/create';
import { createGmailService } from '../../../services/gmail/create';
import { createGoogleCalendarService } from '../../../services/google_calendar/create';
import { createGoogleDriveService } from '../../../services/google_drive/create';
import { createSlackService } from '../../../services/slack/create';
import { createUsageService } from '../../../services/usage/create';

const { authService } = createAuthService(config.auth0);
const { gmailService } = createGmailService(config.gmail);
const { googleDriveService } = createGoogleDriveService(config.googleDrive);
const { slackService } = createSlackService(config.slack);
const { googleCalendarService } = createGoogleCalendarService(
  config.googleCalendar
);
const { usageService } = createUsageService({
  authService,
  config: config.stripe,
});

const services: { [key in Services]: ServiceImpl<IServiceMap[key]> } = {
  gmail: gmailService,
  google_drive: googleDriveService,
  slack: slackService,
  usage: usageService,
  google_calendar: googleCalendarService,
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
    serviceName in services
      ? services[serviceName as keyof typeof services]
      : undefined;

  if (!service) {
    throw new Error('invalid service');
  }

  const handler = service[
    handlerName as keyof typeof service
  ] as NextApiHandler;

  if (!handler) {
    throw new Error('invalid handler');
  }

  return handler(req, res);
}
