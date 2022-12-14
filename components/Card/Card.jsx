import PropTypes from 'prop-types';
import Image from 'next/image';
import { ButtonLink } from '../ButtonLink/ButtonLink';
import { useTranslation } from 'next-i18next';

export const Card = ({ title, preview, image, href, alt }) => {
  const { t } = useTranslation('common');

  return (
    <article className="mx-auto flex h-[518px] flex-col items-center justify-between rounded-[32px] bg-slate-50 px-6 pt-6 pb-10 text-slate-600 shadow-card sm:max-w-[440px] md:max-w-[330px] md:pb-12 xl:h-[542px] xl:max-w-[412px]">
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
      <ButtonLink href={href}>{t('buttonCard')}</ButtonLink>
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
