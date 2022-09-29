import React from 'react';
import ReactMarkdown from 'react-markdown';
import { getSortedCardData } from '@/lib/cards';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getAllCardsPath, getCardData } from '@/lib/cards';
import Link from 'next/link';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';
import PageFlower from '../public/img/svg/pageFlower.svg';
import { getBannerData } from '@/lib/banner';

const Page = ({ data: { data, contents } }) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>

      <section>
        <header className="pt-12 pb-7 shadow-slugHeader">
          <div className="container overflow-hidden">
            <div className="flex w-full items-center gap-8 xl:items-baseline">
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

              <PageFlower className="ml-auto hidden w-[154px]  sm:block md:w-[260px] xl:w-[412px]" />
            </div>
          </div>
        </header>

        <div className="container">
          <div className="prose mr-auto max-w-full break-words py-20 prose-h2:relative prose-h2:mt-0 prose-h2:text-2xl prose-h2:font-medium prose-h2:leading-7 prose-h2:text-slate-600 prose-p:mt-0 prose-p:text-base prose-p:leading-6 prose-p:text-slate-600 prose-a:whitespace-pre-wrap prose-a:text-button prose-a:no-underline hover:prose-a:underline focus:prose-a:underline prose-blockquote:p-2 prose-blockquote:py-4 prose-strong:text-slate-600 prose-ol:pl-4 prose-ul:pl-4 md:prose-h2:text-[34px] md:prose-h2:leading-[39px] md:before:prose-h2:top-[13px] md:before:prose-h2:left-[-20px] xl:prose-p:text-xl xl:prose-p:leading-[1.24] xl:prose-a:text-xl xl:prose-a:leading-[1.24] xl:prose-blockquote:p-4">
            <ReactMarkdown>{contents}</ReactMarkdown>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;

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
  const bannerData = getBannerData(locale);

  return {
    props: {
      data,
      slugs,
      bannerData,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};
