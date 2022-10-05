import dynamic from 'next/dynamic';
import '../styles/index.css';
import { appWithTranslation } from 'next-i18next';
import { Header } from '@/components';
import { Banner } from 'views';

const Footer = dynamic(() =>
  import('../components/Footer.jsx').then(mod => mod.Footer),
);
const LinkToTop = dynamic(() =>
  import('../components/LinkToTop/LinkToTop.jsx').then(mod => mod.LinkToTop),
);

const MyApp = ({ Component, pageProps }) => {
  const { slugs, bannerData, footerData } = pageProps;

  return (
    <>
      <Banner data={bannerData} />
      <Header slugs={slugs} />
      <Component {...pageProps} />
      <Footer slugs={slugs} footerData={footerData} />
      <LinkToTop />
    </>
  );
};

export default appWithTranslation(MyApp);
