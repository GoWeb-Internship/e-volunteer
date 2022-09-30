import '../styles/index.css';
import { appWithTranslation } from 'next-i18next';
import { Header, Footer } from '@/components';
import { Banner } from 'views';

const MyApp = ({ Component, pageProps }) => {
  const { slugs, bannerData } = pageProps;

  return (
    <>
      <Banner data={bannerData} />
      <Header />
      <Component {...pageProps} />
      <Footer slugs={slugs} />
    </>
  );
};

export default appWithTranslation(MyApp);
