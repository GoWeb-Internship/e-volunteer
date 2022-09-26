import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';

import Search from '@/components/search/Search';
import { getSortedCardData } from '@/lib/cards';

const Home = ({ slugs }) => {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></Script>
      </Head>

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
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  const slugs = getSortedCardData(locale);
  return {
    props: {
      slugs,
      message: require(`../../locales/${locale}.json`)
    },
  };
};

export default Home;