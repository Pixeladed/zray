import type { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../../base/header/header';
import styles from './landing.module.css';

export const LandingPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>
          Z-Ray | Search for anything across all of your apps and tools
        </title>
        <meta
          name="description"
          content="Search for anything across all of your apps and tools"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Global search for all your tools</h1>
        </div>
      </main>
    </div>
  );
};
