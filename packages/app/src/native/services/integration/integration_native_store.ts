import Store from 'electron-store';
import ElectronStore from 'electron-store';
import { Crypt } from '../../base/crypt';

export class IntegrationNativeStore {
  private store: Store<StoreLayout>;

  constructor(
    private readonly name: string,
    private readonly crypt: Crypt,
    private readonly serializer: Serializer,
    private readonly deserializer: Deserializer
  ) {
    this.store = new Store<StoreLayout>({
      name,
      migrations: {},
    });
  }
}

export type Serializer = <T>(data: T) => string;
export type Deserializer = <T>(encoded: string) => T;

interface StoreLayout {}
