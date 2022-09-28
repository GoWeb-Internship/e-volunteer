import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';
import { getSortedCardData } from '@/lib/cards';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Search } from '@/components/Search/Search';
import { Spinner } from '@/components/Spinner/Spinner';
import { Form } from '@/components/Form/Form';
import { Cards } from 'views';

const Home = ({ slugs }) => {
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

      <Search />
      <Spinner />
      <Form />

      <Cards slugs={slugs} />
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
