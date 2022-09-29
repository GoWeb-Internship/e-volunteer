import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { getSortedCardData } from '@/lib/cards';
import { getCentersData } from '@/lib/home';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { Cards, Help } from 'views';
import { Spinner, Form, Modal } from '@/components';
import { Centers } from 'views/Centers';

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
        <title>Home Page</title>
      </Head>
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></Script>

      <Spinner />
      <Form />

      <Help title="Ma tahan aidata" button="Vali" EST onClick={openModal} />
      <Cards slugs={slugs} />
      <Help title={t('helpTitle')} button={t('buttonCard')} href="helping" />
      <Centers data={centres} />
      <Modal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  const slugs = getSortedCardData(locale);
  const centres = getCentersData(locale);
  return {
    props: {
      slugs,
      centres,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Home;
