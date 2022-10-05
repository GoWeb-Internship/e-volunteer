import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { useLocalChange } from 'hooks/useLocalChange';
import { Logo, MobileMenu, Navbar } from '.';

export const Header = ({ slugs }) => {
  const [router, handleLocaleChange] = useLocalChange();
  const { t } = useTranslation('common');
  const [showNavbar, setNavbar] = useState(null);
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });

  useEffect(() => {
    setNavbar(isTablet);
  }, [isTablet]);

  return (
    <header className="bg-blue-300 pt-[12px] pb-[12px]">
      <div className="container">
        <div className="flex items-center justify-between">
          <Logo />

          {showNavbar ? (
            <Navbar
              linkValue={t('help')}
              handleLocaleChange={handleLocaleChange}
              locale={router.locale}
            />
          ) : (
            <MobileMenu slugs={slugs} />
          )}
        </div>
      </div>
    </header>
  );
};
