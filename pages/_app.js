import '../styles/index.css';
import { appWithTranslation } from 'next-i18next';
import { Header, Footer } from '@/components';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default appWithTranslation(MyApp);
