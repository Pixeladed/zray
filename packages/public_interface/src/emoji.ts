import { ID } from './id';

export interface ImageSource {
  size: number;
  url: string;
}

export interface Emoji {
  id: ID<'emoji'>;
  name: string;
  keywords: readonly string[];
  utf8?: string;
  images: readonly ImageSource[];
}
