import '../styles/index.css';
import { appWithTranslation } from 'next-i18next';
// import { Header, Footer } from '@/components';
import { Layout } from '../components';


const MyApp = ({ Component, pageProps }) => {
  return (
    <>
    <Layout>
      {/* <Header /> */}
      <Component {...pageProps} />
      {/* <Footer slugs={pageProps.slugs}/> */}
      </Layout>
    </>
  );
};

export default appWithTranslation(MyApp);
