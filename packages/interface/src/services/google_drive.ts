import { IClient } from '../client';
import { IGoogleService } from './google';

export interface IGoogleDriveService extends IGoogleService {}

export type GoogleDriveClient = IClient<IGoogleDriveService>;
