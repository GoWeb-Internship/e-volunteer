import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';
import { getSortedCardData } from '@/lib/cards';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { Cards, Help } from 'views';
import { Spinner, Form } from '@/components';

const Home = ({ slugs }) => {
  const { t } = useTranslation('common');

  useEffect(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', user => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></Script>

      <Spinner />
      <Form />

      <Help title="Ma tahan aidata" button="Vali" EST />
      <Cards slugs={slugs} />
      <Help title={t('helpTitle')} button={t('buttonCard')} href="helping" />
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  const slugs = getSortedCardData(locale);
  return {
    props: {
      slugs,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Home;
