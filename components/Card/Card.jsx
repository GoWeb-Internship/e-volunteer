import Image from 'next/image';
import { ButtonLink } from '../ButtonLink/ButtonLink';
import { useTranslation } from 'next-i18next';

export const Card = ({ title, preview, image, href, alt }) => {
  const { t } = useTranslation('common');
  return (
    <article>
      <a href={href}>
        <Image src={image} alt={alt} />
        <h3>{title}</h3>
        <p>{preview}</p>
        <ButtonLink href={href}>{t('buttonCard')}</ButtonLink>
      </a>
    </article>
  );
};
