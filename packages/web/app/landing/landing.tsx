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
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Global search for all your tools</h1>
          <p className={styles.heroLead}>
            Find anything across all of your apps and tools
          </p>
          <img
            src="https://via.placeholder.com/800x400"
            alt="Z-Ray product screenshot"
            width={800}
            height={400}
            className={styles.heroImage}
          />
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            See through everything, all at once
          </h2>
          <p className={styles.sectionLead}>
            That&apos;s why we call it Z-Ray, giving you full visibility over
            all your work, instantly.
          </p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Your data is your data</h2>
          <p className={styles.sectionLead}>
            Z-Ray runs everything locally on your device, your account
            credentials are never sent to us and we don&apos;t store your data
            on our servers.
          </p>
        </section>
      </main>
    </div>
  );
};
