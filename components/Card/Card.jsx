import PropTypes from 'prop-types';
import Image from 'next/image';
import { ButtonLink } from '../ButtonLink/ButtonLink';
import { useTranslation } from 'next-i18next';

export const Card = ({ title, preview, image, href, alt }) => {
  const { t } = useTranslation('common');

  return (
    <article className=" mx-auto h-[518px] max-w-[440px] rounded-[32px] bg-slate-50 shadow-card md:max-w-[330px] xl:h-[542px] xl:max-w-[412px]">
      <a
        href={href}
        className="flex h-full flex-col items-center justify-between px-6 pt-6 pb-10 text-slate-600 md:pb-12"
      >
        <div>
          <Image
            src={`/img/${image}`}
            alt={alt}
            height={220}
            width={392}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPkN1paAwACogFkTwIyawAAAABJRU5ErkJggg=="
            className="overflow-hidden rounded-[20px]"
          />
          <h3 className="mt-8 mb-4 text-2xl font-medium leading-7">{title}</h3>
          <p>{preview}</p>
        </div>
        <ButtonLink button>{t('buttonCard')}</ButtonLink>
      </a>
    </article>
  );
};
Card.propTypes = {
  title: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
