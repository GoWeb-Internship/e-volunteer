import Head from 'next/head';
import { useRouter } from 'next/router';
import { attributes, react as HomeContent } from '../content/home.md';
import { Locale } from 'views';
// mport useTranslation from "next-translate/useTranslation";




const Home = () => {
  let { title, cats } = attributes;
  // let { t } = useTranslation();
 
let router = useRouter();
let greeting = 
router.locale === "ru" 
? "Росія" 
: router.locale === "uk" 
? "Україна"
: "";  
  
  return (
    <>
      <Head>
        <title>Home Page</title>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <Locale/>
      <h1 className='pb-[40px] text-center'>{greeting}</h1>

      <article>
        <h1>{title}</h1>
        
        <HomeContent />

        <ul>
          {cats.map((cat, k) => (
            <li key={k}>
              <h2>{cat.name}</h2>
              <p>{cat.description}</p>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
};

export default Home;
