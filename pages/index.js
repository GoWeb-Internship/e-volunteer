import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';
import { getSortedCardData } from '@/lib/cards';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { Cards, Help } from 'views';
import { getBannerData } from '@/lib/banner';

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

      <Help title={t('helpTitle')} button={t('buttonCard')} href="helping" />

      <Cards slugs={slugs} />
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
