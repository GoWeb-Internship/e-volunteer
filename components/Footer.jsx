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
        <div className="xl:px-20">
          <div className="flex flex-wrap items-baseline justify-between border-b-2 pb-[24px] pt-[24px]">
            <Logo />

            <Link href="https://t.me/eevolunteer">
              <a
                href="https://t.me/eevolunteer"
                aria-label="логотип"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <span className="mr-[19px] text-sm text-white">
                  {t('telegram')}
                </span>
                <Teleg className="w-[22px]" />
              </a>
            </Link>
          </div>

          <Grid type="footer" tag="ul" className="pb-[32px] pt-[32px]">
            {slugs &&
              slugs.map(({ href, title }) => (
                <li className="pl-[20px] text-white " key={href}>
                  <Link href={`/${href}`}>
                    <a className="transition-all hover:text-slate-200 focus:text-slate-200">
                      {title}
                    </a>
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
