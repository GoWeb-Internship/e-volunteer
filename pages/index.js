import { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getSortedCardData } from '@/lib/cards';
import { Form, FormEst } from '@/components';
import { getBannerData } from '@/lib/banner';
import { Cards, Help } from 'views';

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

      <Help title="Ma tahan aidata" button="Vali" EST />
      <Cards slugs={slugs} />
      <Help title={t('helpTitle')} button={t('buttonCard')} href="helping" />
      <Form />
      <FormEst />
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  const slugs = getSortedCardData(locale);
  const bannerData = getBannerData(locale);

  return {
    props: {
      slugs,
      bannerData,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Home;
