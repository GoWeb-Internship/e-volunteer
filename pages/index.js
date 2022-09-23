import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';

import { attributes, react as HomeContent } from '../content/home.md';
import Search from '@/components/search/Search';
import { getSortedCardData } from '@/lib/cards';

const Home = ({ slugs }) => {
  let { title, cats } = attributes;
  return (
    <>
      <Head>
        <title>Home Page</title>
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></Script>
      </Head>

      <article>
        <h1>{title}</h1>

        <HomeContent />
        <Search />
        <ul>
          {cats.map((cat, k) => (
            <li key={k}>
              <h2>{cat.name}</h2>
              <p>{cat.description}</p>
            </li>
          ))}
        </ul>

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
      </article>
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  const slugs = getSortedCardData(locale);
  return {
    props: {
      slugs,
    },
  };
};

export default Home;
