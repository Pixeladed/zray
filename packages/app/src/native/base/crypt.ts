import { Assert } from '@highbeam/utils';
import { SafeStorage } from 'electron';

export interface Crypt {
  encrypt(rawValue: string): string;
  decrypt(encryptedValue: string): string;
}

export class OSCrypt implements Crypt {
  private encoding: BufferEncoding = 'hex';

  constructor(
    private readonly provider: Pick<
      SafeStorage,
      'isEncryptionAvailable' | 'encryptString' | 'decryptString'
    >
  ) {}

  encrypt = (rawValue: string): string => {
    Assert.that(
      this.provider.isEncryptionAvailable(),
      'cannot encrypt without safe storage'
    );
    const buffer = this.provider.encryptString(rawValue);
    const encrypted = buffer.toString(this.encoding);
    return encrypted;
  };

  decrypt = (encryptedValue: string): string => {
    const buffer = Buffer.from(encryptedValue, this.encoding);
    const value = this.provider.decryptString(buffer);
    return value;
  };
}
