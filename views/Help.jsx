import PropTypes from 'prop-types';
import { ButtonLink } from '/components';
import Flower from 'public/img/svg/help.svg';

const Help = ({ title, button, href, EST, ...props }) => {
  return (
    <section
      className={`bg-gradient-to-b py-10 drop-shadow-card md:py-[52px] xl:py-6 ${
        EST ? 'from-blue-200 to-white' : 'from-white to-blue-200'
      }`}
    >
      <div className="container text-center md:flex md:flex-row md:items-center md:justify-between">
        <Flower className="hidden h-[113px] w-[175px] xl:mr-[45px] xl:block" />

        <h2 className=" mb-6 text-[24px] leading-[28px] text-slate-600 md:mb-0 md:text-[34px] md:leading-[44px]">
          {title}
        </h2>
        {EST ? (
          <ButtonLink button className="mx-auto md:mx-0 " {...props}>
            {button}
          </ButtonLink>
        ) : (
          <ButtonLink href={href} className="mx-auto md:mx-0 ">
            {button}
          </ButtonLink>
        )}
      </div>
    </section>
  );
};

export default Help;

Help.propTypes = {
  title: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  href: PropTypes.string,
  EST: PropTypes.bool,
};
