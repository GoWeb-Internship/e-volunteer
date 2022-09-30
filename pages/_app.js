import '../styles/index.css';
import { appWithTranslation } from 'next-i18next';
import { Header, Footer } from '@/components';
import { Banner } from 'views';

const MyApp = ({ Component, pageProps }) => {
  const { slugs, bannerData, footerData } = pageProps;

  return (
    <>
      <Banner data={bannerData} />
      <Header  slugs={slugs}/>
      <Component {...pageProps} />
      <Footer slugs={slugs} footerData={footerData} />
    </>
  );
};

export default appWithTranslation(MyApp);
