import '../styles/index.css';
import { appWithTranslation } from 'next-i18next';
import Header from "@/components/Header";


const MyApp = ({ Component, pageProps }) => {
  return( 
    <>

  <Header/>
  <Component {...pageProps} />

  </>
  )
};

export default appWithTranslation(MyApp);
