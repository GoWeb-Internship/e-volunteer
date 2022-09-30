import Link from 'next/link';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'next-i18next';
import { Logo } from './Logo/Logo';
import Teleg from '../public/img/svg/teleg.svg';
import { Grid } from 'components';

export const Footer = ({ slugs, footerData }) => {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-blue-400">
      <div className="container">
        <div className="md:ml-[80px] md:mr-[80px]">
          <div className="flex  items-center border-b-2 pb-[24px] pt-[24px] justify-between">
            <Logo />
            <div className="flex mt-[30px] pl-[24px]  ">
              <Link href="https://web.telegram.org/z/">
              <p className="pr-[19px] text-white">{t('telegram')}</p></Link>
              <Link href="https://web.telegram.org/z/">
                <a href="https://web.telegram.org/z/" aria-label="логотип">
                  <Teleg className="w-[22px]" />
                </a>
              </Link>
            </div>
          </div>
          <Grid type="footer" tag="ul" className="pb-[32px] pt-[32px]">
            {slugs &&
              slugs.map((slug, idx) => (
                <li className="pl-[20px] text-white " key={idx}>
                  <Link href={`/${slug.href}`}>
                    <a>{slug.title}</a>
                  </Link>
                </li>
              ))}
          </Grid>

          {footerData && (
            <div className="border-b-2 pb-[24px] text-center text-white">
              <ReactMarkdown>{footerData.contents}</ReactMarkdown>
            </div>
          )}

          <div className="flex pb-[24px] pt-[20px]">
            <span className="pr-1 text-white">&copy;</span>
            <span className="text-white ">{new Date().getFullYear()}</span>
            <p className="pl-1 text-white">E-VOLUNTEER</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  slugs: PropTypes.arrayOf(PropTypes.object),
  footerData: PropTypes.shape({
    contents: PropTypes.string,
  }),
};
