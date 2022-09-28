import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';
import { getSortedCardData } from '@/lib/cards';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Search } from '@/components/Search/Search';
import { Spinner } from '@/components/Spinner/Spinner';
import { Form } from '@/components/Form/Form';
import { Card } from '@/components/Card/Card';

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

      <h2 className="mt-12 text-center font-bold">Ссылки</h2>

      <div>
        {slugs.map((slug, idx) => (
          <Card
            key={idx}
            title={slug.title}
            preview={slug.preview}
            image={slug.poster}
            href={slug.href}
            alt={slug.alt}
          />
        ))}
      </div>
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
