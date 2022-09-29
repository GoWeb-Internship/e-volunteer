import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getHelpData } from '@/lib/helping';
import { getSortedCardData } from '@/lib/cards';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';
import Flower from 'public/img/svg/pageFlower.svg';
import { getBannerData } from '@/lib/banner';

const Helping = ({ help: { contents, data } }) => {
  return (
    <section className="px-5 py-10 md:px-9 md:pt-[69px] md:pb-[100px] xl:px-[80px] xl:pt-[14px]">
      <header className="shadow-page flex justify-between">
        <div className="flex items-baseline text-slate-600 xl:pt-[90px]">
          <Link href="/">
            <a
              href=""
              aria-label="Ссылка на главную страницу"
              className="mr-[77px]"
            >
              <ArrowLongLeftIcon
                className="h-7 w-7"
                aria-label="Стрелка назад"
              />
            </a>
          </Link>
          <h1 className="text-[40px] font-medium leading-tight">
            {data.title}
          </h1>
        </div>
        <Flower className="h-[54px] w-[158px] md:h-[89px] md:w-[260px] xl:h-[141px] xl:w-[413px]" />
      </header>
      <ReactMarkdown className="xl:mt-[80px]">{contents}</ReactMarkdown>
    </section>
  );
};

export const getStaticProps = async ({ locale }) => {
  const help = getHelpData(locale);
  const slugs = getSortedCardData(locale);
  const bannerData = getBannerData(locale);

  return {
    props: {
      help,
      slugs,
      bannerData,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Helping;
