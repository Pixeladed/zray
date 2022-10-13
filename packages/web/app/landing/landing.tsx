import { Button } from '@highbeam/components';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
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

      <header className={styles.header}>
        <div className={styles.brandBlock}>
          <Image src="/icon.png" width={32} height={32} />
          <h1 className={styles.headerTitle}>Highbeam</h1>
        </div>
        <div className={styles.menu}>
          <Link passHref={true} href="/product">
            <a>Product</a>
          </Link>
          <Link passHref={true} href="/integrations">
            <a>Integrations</a>
          </Link>
          <Link passHref={true} href="/pricing">
            <a>Pricing</a>
          </Link>
        </div>
        <Button variant="primary">Download for Mac</Button>
      </header>
      <main>
        <section className={styles.hero}>
          <h2 className={styles.heroTitle}>
            Find anything
            <br />
            with one search
          </h2>
          <p className={styles.lead}>
            Connect your favorite apps and use Highbeam
            <br /> to look for anything with one single search
          </p>
          <Button variant="primary">Download for Mac</Button>
        </section>
        <section className={styles.comparison}></section>
      </main>
    </div>
  );
};
