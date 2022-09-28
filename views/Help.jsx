import { ButtonLink } from '/components';
import Flower from 'public/img/svg/help.svg';

export const Help = ({ title, button, href, EST }) => {
  return (
    <section
      className={`bg-gradient-to-b  py-10 text-center shadow-card md:flex md:items-center md:justify-around md:py-[52px] ${
        EST ? 'from-blue-200 to-white' : 'from-white to-blue-200'
      }`}
    >
      <Flower className="hidden h-[113px] w-[175px] xl:block" />
      <h2 className=" mb-6 text-[24px] leading-[28px] md:mb-0 md:text-[34px] md:leading-[44px]">
        {title}
      </h2>
      {EST ? (
        <ButtonLink button className="mx-auto md:mx-0">
          {button}
        </ButtonLink>
      ) : (
        <ButtonLink href={href} className="mx-auto md:mx-0">
          {button}
        </ButtonLink>
      )}
    </section>
  );
};
