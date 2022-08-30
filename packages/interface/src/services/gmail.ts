import { IClient } from '../client';
import { IGoogleService } from './google';

export interface IGmailService extends IGoogleService {}

export type GmailClient = IClient<IGmailService>;
