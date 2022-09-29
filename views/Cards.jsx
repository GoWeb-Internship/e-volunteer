import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { Card, Grid } from 'components';

export const Cards = ({ slugs }) => {
  const { t } = useTranslation('common');
  return (
    <section className="bg-blue-200 py-[58px]  sm:py-[80px] md:py-[100px]">
      <div className="container">
        <h2 className="visually-hidden">{t('cardsTitle')}</h2>
        <Grid type="card">
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
        </Grid>
      </div>
    </section>
  );
};

Cards.propTypes = {
  slugs: PropTypes.arrayOf(PropTypes.object).isRequired,
};
