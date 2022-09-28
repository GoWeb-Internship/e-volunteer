import { useTranslation } from 'next-i18next';
import { Card } from 'components';

export const Cards = ({ slugs }) => {
  const { t } = useTranslation('common');
  return (
    <section>
      <h2 className="visually-hidden">{t('cardsTitle')}</h2>
      <div>
        {slugs.map((slug, idx) => (
          <Card
            key={idx}
            title={slug.title}
            preview={slug.preview}
            image={slug.poster}
            href={slug.href}
            alt={slug.alt}
          />
        ))}
      </div>
    </section>
  );
};
