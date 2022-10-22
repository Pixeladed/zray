import { Button } from '@highbeam/components';
import classNames from 'classnames';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';
import styles from './landing.module.css';

export const LandingPage: NextPage = () => {
  return (
    <div className={styles.page}>
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
          <Image src="/icon.svg" width={32} height={32} alt="Highbeam logo" />
          <h1 className={styles.headerTitle}>Highbeam</h1>
        </div>
        {/* <div className={styles.menu}>
          <Link passHref={true} href="/product">
            <a>Product</a>
          </Link>
          <Link passHref={true} href="/integrations">
            <a>Integrations</a>
          </Link>
          <Link passHref={true} href="/pricing">
            <a>Pricing</a>
          </Link>
        </div> */}
        <div className={styles.cta}>
          <DownloadButton variant="primary" />
        </div>
      </header>
      <main>
        <section className={styles.hero}>
          <h2 className={styles.heroTitle}>
            Find anything
            <br />
            with one search
          </h2>
          <p className={styles.lead}>
            Connect your favorite apps and use Highbeam to look for anything
            with one single search
          </p>
          <DownloadButton variant="primary" />
          <div className={styles.productScreenshot}>
            <Image
              src="/product_screenshot.png"
              width={912}
              height={512}
              alt="product screenshot"
            />
          </div>
        </section>
        <section className={classNames(styles.integrations, styles.container)}>
          <div className={styles.integrationsList}>
            {integrations.map(integration => (
              <IntegrationCard
                key={integration.name}
                icon={integration.icon}
                name={integration.name}
                description={integration.description}
                comingSoon={integration.comingSoon}
              />
            ))}
          </div>
          {/* <Button>Explore all integrations</Button> */}
        </section>
        <section className={classNames(styles.features, styles.container)}>
          <div className={styles.feature}>
            <div className={styles.featureInfo}>
              <h4 className={styles.featureTitle}>Productivity+</h4>
              <p className={styles.featureDescription}>
                An average person use tens of different digital tools from
                emails to cloud storage, task management and more. In this
                modern age, it&apos;s easier than ever to get lost.
                <br />
                <br />
                Find that email, message, task or document, no matter where you
                put it on the web. Highbeam makes you more productive by combing
                through your tools to find exactly where something is without
                you manually opening each app individually.
              </p>
            </div>
            {/* <img src="" alt="" className={styles.featureImage} /> */}
          </div>
          <div className={styles.feature}>
            <div className={styles.featureInfo}>
              <h4 className={styles.featureTitle}>Privacy first</h4>
              <p className={styles.featureDescription}>
                With our privacy-preserving search architecture, no credentials,
                files or personal information from your accounts are sent to our
                servers. Everything happen locally on your device. <br />
                <br />
                We make money through revenue from our app subscription, adding
                new integrations and improving your search experience.
              </p>
            </div>
            {/* <img src="" alt="" className={styles.featureImage} /> */}
          </div>
        </section>
        <section className={classNames(styles.pricing, styles.container)}>
          <h3 className={styles.pricingTitle}>
            It&apos;s time to close your tabs, try Highbeam
          </h3>
          <div className={styles.plans}>
            <div className={classNames(styles.plan, styles.free)}>
              <h4 className={styles.planName}>Free</h4>
              <p className={styles.planPrice}>
                $0 <span className={styles.planFrequency}>/ month</span>{' '}
              </p>
              <p className={styles.planDescription}>
                Get started with the free plan:
              </p>
              <ul className={styles.planFeatures}>
                <li>Connect up to 3 tools</li>
                <li>Search across all connected tools</li>
                <li>Privacy-preserving search</li>
              </ul>
              <DownloadButton />
            </div>
            <div className={classNames(styles.plan, styles.pro)}>
              <h4 className={styles.planName}>Pro</h4>
              <p className={styles.planPrice}>
                $4.99 <span className={styles.planFrequency}>/ month</span>
              </p>
              <p className={styles.planDescription}>
                Everything you need to be a pro:
              </p>
              <ul className={styles.planFeatures}>
                <li>Connect unlimited integrations</li>
                <li>Search across all connected tools</li>
                <li>Privacy preserving search</li>
              </ul>
              <DownloadButton />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const trackDownload = () => {
  try {
    // @ts-ignore
    gtag('event', 'app_downloaded', {
      screen_name: 'landing_page',
    });
  } catch (e) {}
};
const DownloadButton = ({
  variant = 'default',
}: {
  variant?: 'default' | 'primary';
}) => {
  return (
    <Link
      onClick={trackDownload}
      passHref={true}
      href="https://releases.usehighbeamapp.com/download"
    >
      <a>
        <Button variant={variant}>Download Highbeam</Button>
      </a>
    </Link>
  );
};

const IntegrationCard = ({
  icon,
  name,
  description,
  comingSoon = false,
}: {
  icon: string;
  name: string;
  description: string;
  comingSoon?: boolean;
}) => {
  return (
    <div className={styles.integrationCard}>
      <Image
        src={icon}
        width={48}
        height={48}
        alt={`${name} icon`}
        className={styles.integrationIcon}
      />
      <h4 className={styles.integrationName}>
        {name}{' '}
        {comingSoon && (
          <span className={styles.comingSoonBadge}>coming soon</span>
        )}
      </h4>
      <p className={styles.integrationDescription}>{description}</p>
    </div>
  );
};

const integrations: ComponentProps<typeof IntegrationCard>[] = [
  {
    icon: '/integrations/google_drive.svg',
    name: 'Google Drive',
    description:
      'Search for anything uploaded to your Google Drive, including docs, sheets and slides',
  },
  {
    icon: '/integrations/gmail.svg',
    name: 'Gmail',
    description: 'Find any sent or received emails in your inbox',
  },
  {
    icon: '/integrations/slack.svg',
    name: 'Slack',
    description: 'Find messages and files in workspaces that you connect to',
  },
  {
    icon: '/integrations/google_calendar.svg',
    name: 'Google Calendar',
    description: 'Find upcoming events and past calendar invites',
  },
  {
    icon: '/integrations/notion.svg',
    name: 'Notion',
    description: 'Search across your spaces and pages',
    comingSoon: true,
  },
  {
    icon: '/integrations/confluence.svg',
    name: 'Confluence',
    description:
      'Find documentation and pages that you wrote or have access to on Confluence Cloud',
    comingSoon: true,
  },
  {
    icon: '/integrations/github.svg',
    name: 'GitHub',
    description: 'Look for a user, repository, issue or file on GitHub',
    comingSoon: true,
  },
  {
    icon: '/integrations/jira.svg',
    name: 'Jira',
    description:
      'Find issues, epics, stories or any other tickets on Jira Cloud',
    comingSoon: true,
  },
];
