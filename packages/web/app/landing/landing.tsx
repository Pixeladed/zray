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
        <section className={styles.featureGroup}>
          <div className={styles.feature}>
            <h2 className={styles.featureTitle}>See everything, all at once</h2>
            <p className={styles.featureLead}>
              Never lose that document, message or email that you sent ever
              again. Search multiple accounts instantly.
            </p>
            <img
              src="https://via.placeholder.com/400x200"
              alt="Z-Ray product screenshot"
              width={400}
              height={200}
              className={styles.featureImage}
            />
          </div>
          <div className={styles.feature}>
            <h2 className={styles.featureTitle}>Your data is your data</h2>
            <p className={styles.featureLead}>
              Z-Ray runs everything locally on your device, your account
              credentials or your data are never sent to our servers.
            </p>
            <img
              src="https://via.placeholder.com/400x200"
              alt="Z-Ray product screenshot"
              width={400}
              height={200}
              className={styles.featureImage}
            />
          </div>
        </section>
      </main>
    </div>
  );
};
