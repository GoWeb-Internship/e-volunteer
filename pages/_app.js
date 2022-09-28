import '../styles/index.css';
import { appWithTranslation } from 'next-i18next';
import { Header } from '@/components';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default appWithTranslation(MyApp);
