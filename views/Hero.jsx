import { useTranslation } from 'next-i18next';

const Hero = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <section className="md:pb-354px hero pt-20 pb-[294px] sm:pb-[456px] xl:pb-[420px]">
        <div className="container">
          <div className="mx-auto flex max-w-[280px] flex-col gap-8 text-hero sm:m-0 sm:max-w-[440px] md:max-w-[558px] md:gap-10 xl:ml-20">
            <h1 className="text-[40px] font-medium uppercase leading-[46px] md:text-[80px] md:leading-[64px]">
              E-VOLUNTEER
            </h1>
            <p className="max-w-[260px] text-xl leading-6 md:max-w-[497px] md:text-[40px] md:font-medium md:leading-[46px]">
              {t('heroDescription')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
