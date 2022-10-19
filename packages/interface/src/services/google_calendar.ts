import { IClient } from '../client';
import { IGoogleService } from './google';

export interface IGoogleCalendarService extends IGoogleService {}

export type GoogleCalendarClient = IClient<IGoogleCalendarService>;
