import React from 'react';
import ReactMarkdown from 'react-markdown';
import { getSortedCardData } from '@/lib/cards';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getAllCardsPath, getCardData } from '@/lib/cards';

const Page = ({ data: { data, contents } }) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>

      <h1 className="mb-8 text-center text-2xl font-bold">{data.title}</h1>
      <div className="prose mx-auto max-w-5xl prose-a:text-blue-600">
        <ReactMarkdown>{contents}</ReactMarkdown>
      </div>

      {data.links && (
        <h2 className="mt-8 text-center text-xl font-bold">Ссылки</h2>
      )}
      <ul className="mx-auto mt-4 max-w-xl list-inside list-disc">
        {data.links?.map((link, idx) => (
          <li key={idx}>
            <a
              href={link.href}
              target="_blank"
              rel="nofollow, noopener, noreferrer"
            >
              {link.description}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export const getStaticPaths = async ({ locales }) => {
  const paths = getAllCardsPath(locales);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug }, locale }) => {
  const data = getCardData(slug, locale);
  const slugs = getSortedCardData(locale);
  return {
    props: {
      data,
      slugs,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};
export default Page;
