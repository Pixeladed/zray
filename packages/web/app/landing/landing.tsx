import { Button } from '@highbeam/components';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';
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
        <section className={styles.integrations}>
          <div className={styles.integrationsList}>
            {integrations.map(integration => (
              <IntegrationCard
                key={integration.name}
                icon={integration.icon}
                name={integration.name}
                description={integration.description}
              />
            ))}
          </div>
          <Button>Explore all integrations</Button>
        </section>
        <section className={styles.features}>
          <div className={styles.feature}>a</div>
          <div className={styles.feature}>b</div>
        </section>
      </main>
    </div>
  );
};

const IntegrationCard = ({
  icon,
  name,
  description,
}: {
  icon: string;
  name: string;
  description: string;
}) => {
  return (
    <div className={styles.integrationCard}>
      <Image
        src={icon}
        width={64}
        height={64}
        className={styles.integrationIcon}
      />
      <h4 className={styles.integrationName}>{name}</h4>
      <p className={styles.integrationDescription}>{description}</p>
    </div>
  );
};

const integrations: ComponentProps<typeof IntegrationCard>[] = [
  {
    icon: '',
    name: 'Google Drive',
    description:
      'Search for anything uploaded to your Google Drive, including docs, sheets and slides',
  },
  {
    icon: '',
    name: 'Gmail',
    description: 'Find any sent or received emails in your inbox',
  },
  {
    icon: '',
    name: 'Slack',
    description: 'Find messages and files in workspaces that you connect to',
  },
  {
    icon: '',
    name: 'Google Calendar',
    description: 'Find upcoming events and past calendar invites',
  },
  {
    icon: '',
    name: 'Notion',
    description: 'Search across your spaces and pages',
  },
  {
    icon: '',
    name: 'Confluence',
    description:
      'Find documentation and pages that you wrote or have access to on Confluence Cloud',
  },
  {
    icon: '',
    name: 'GitHub',
    description: 'Look for a user, repository, issue or file on GitHub',
  },
  {
    icon: '',
    name: 'Jira',
    description:
      'Find issues, epics, stories or any other tickets on Jira Cloud',
  },
];
