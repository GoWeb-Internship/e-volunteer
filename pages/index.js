import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Search from '@/components/search/Search';
import Form from '@/components/form/Form';
import { getSortedCardData } from '@/lib/cards';
import { useEffect } from 'react';


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

      <Form/>
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