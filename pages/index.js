import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { attributes, react as HomeContent } from '../content/home.md';
import Search from '@/components/search/Search';

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
export const getStaticProps = async () => {
  const files = fs.readdirSync('content/cards');
  const slugs = files.map(filename => {
    const href = filename.replace('.md', '');
    const title = matter(fs.readFileSync(path.join('content/cards/', filename)))
      .data.title;
    return { title, href };
  });

  return {
    props: {
      slugs,
    },
  };
};

export default Home;
