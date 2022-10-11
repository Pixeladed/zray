import { Button } from '@highbeam/components';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from './landing.module.css';

export const LandingPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>
          Highbeam App | Search for anything across all of your apps and tools
        </title>
        <meta
          name="description"
          content="Search for anything across all of your apps and tools"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className={styles.hero}>
          <Image src="/icon.png" width={96} height={96} />
          <h1 className={styles.heroTitle}>
            Find anything, anywhere, all at once
          </h1>
          <p className={styles.heroLead}>
            Search for any files, messages, tasks or events
          </p>
          <Button variant="primary">
            <span className={styles.heroCta}>Download Highbeam for Mac</span>
          </Button>
        </section>
      </main>
    </div>
  );
};
