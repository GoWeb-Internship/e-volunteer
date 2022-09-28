import '../styles/index.css';
import { appWithTranslation } from 'next-i18next';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';


const MyApp = ({ Component, pageProps}) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer slugs={pageProps.slugs}/>
    </>
  );
};


export default appWithTranslation(MyApp);
