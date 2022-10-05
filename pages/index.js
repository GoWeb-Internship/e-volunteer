import Head from 'next/head';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getBannerData } from '@/lib/banner';
import { getSortedCardData } from '@/lib/cards';
import { getCentersData } from '@/lib/home';
import { getFooterData } from '@/lib/footer';

const Hero = dynamic(() => import('views/Hero.jsx'));
const Help = dynamic(() => import('views/Help.jsx'));
const Centers = dynamic(() => import('views/Centers.jsx'));
const Cards = dynamic(() => import('views/Cards.jsx'));
const Form = dynamic(() =>
  import('../components/Form/Form.jsx').then(mod => mod.Form),
);
const Modal = dynamic(() =>
  import('../components/Modal/Modal.jsx').then(mod => mod.Modal),
);

const Home = ({ slugs, centres }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('common');

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', user => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>E-VOLUNTEER</title>
      </Head>
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></Script>

      <Hero />
      <Help title="Ma tahan aidata" button="Vali" EST onClick={openModal} />
      <Cards slugs={slugs} />
      <Help title={t('helpTitle')} button={t('buttonCard')} href="helping" />
      <Centers data={centres} />
      <Form />
      <Modal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  const slugs = getSortedCardData(locale);
  const centres = getCentersData(locale);
  const bannerData = getBannerData(locale);
  const footerData = getFooterData(locale);

  return {
    props: {
      slugs,
      centres,
      bannerData,
      footerData,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Home;
