import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { config } from '../../base/config';
import styles from './download.module.css';

const MAC_DOWNLOAD_URL = config.updateServerUrl + '/download/darwin';
const WINDOWS_DOWNLOAD_URL = config.updateServerUrl + '/download/win32';

export const DownloadPage = () => {
  return (
    <div>
      <Head>
        <title>
          Highbeam App | Download | Search for anything across all of your apps
          and tools
        </title>
        <meta
          name="description"
          content="Search for anything across all of your apps and tools"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Link passHref={true} href="/">
          <a>
            <div className={styles.brandBlock}>
              <Image
                src="/icon.svg"
                width={32}
                height={32}
                alt="Highbeam logo"
              />
              <h1 className={styles.headerTitle}>Highbeam</h1>
            </div>
          </a>
        </Link>
      </header>
      <main>
        <div className={styles.hero}>
          <Image src="/icon.svg" width={128} height={128} alt="Highbeam logo" />
          <h1 className={styles.heroTitle}>Download Highbeam</h1>
        </div>

        <div className={styles.options}>
          <Link passHref={true} href={MAC_DOWNLOAD_URL}>
            <a>
              <div className={styles.option}>
                <Image
                  src="/mac.svg"
                  width={32}
                  height={32}
                  alt="Mac OSX icon"
                  objectFit="contain"
                  objectPosition="center"
                />
                <div>
                  <h3 className={styles.optionTitle}>Download for Mac OSX</h3>
                  <p className={styles.optionDescription}>
                    Highbeam.app v0.1.0
                  </p>
                </div>
              </div>
            </a>
          </Link>
          <Link passHref={true} href={WINDOWS_DOWNLOAD_URL}>
            <a>
              <div className={styles.option}>
                <Image
                  src="/windows.svg"
                  width={32}
                  height={32}
                  alt="Windows icon"
                  objectFit="contain"
                  objectPosition="center"
                />
                <div>
                  <h3 className={styles.optionTitle}>Download for Windows</h3>
                  <p className={styles.optionDescription}>
                    Highbeam.exe v0.1.0
                  </p>
                </div>
              </div>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
};
