import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import { useEffect } from 'react';
import { getSortedCardData } from '@/lib/cards';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Spinner,  Form } from '@/components';

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

      <Spinner />
      

      <h2 className="mt-12 text-center font-bold">Ссылки</h2>

      <ul className="mx-auto mt-4 max-w-lg list-inside list-disc ">
        {slugs.map((slug, idx) => (
          <li key={idx}>
            <Link href={`/${slug.href}`}>
              <a>{slug.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <Form />
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
