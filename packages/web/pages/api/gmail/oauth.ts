import { config } from '../../../base/config';
import { createGmailService } from '../../../services/gmail/create';

const { gmailService } = createGmailService(config.gmail);

export default gmailService.oauth;
