import React from 'react';
import ReactMarkdown from 'react-markdown';
import { getSortedCardData } from '@/lib/cards';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getAllCardsPath, getCardData } from '@/lib/cards';
import Link from 'next/link';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';
import PageFlower from '../public/img/svg/pageFlower.svg';

const Page = ({ data: { data, contents } }) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>

      <section>
        <header className="pt-12 pb-7 shadow-slugHeader">
          <div className="container">
            <div className="flex w-full items-baseline gap-8 ">
              <Link href="/">
                <a href="">
                  <ArrowLongLeftIcon className="h-7 w-7 text-gray-800" />
                </a>
              </Link>

              {data.title && (
                <h1 className="mb-0 text-2xl font-medium leading-7 text-slate-600 md:text-[40px] md:leading-[46px]">
                  {data.title}
                </h1>
              )}

              <PageFlower className="ml-auto hidden w-[154px] sm:block md:w-[260px] xl:w-[412px]" />
            </div>
          </div>
        </header>

        <div className="container">
          <div className="prose max-w-full py-20 transition-all prose-h2:mt-0 prose-p:mt-0 prose-a:text-button prose-a:no-underline hover:prose-a:underline focus:prose-a:underline prose-blockquote:px-[42px] prose-ol:list-decimal prose-li:truncate">
            <ReactMarkdown>{contents}</ReactMarkdown>
          </div>
        </div>
      </section>
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
