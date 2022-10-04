import Link from 'next/link';
import { Search } from '../views/Search';
import { useTranslation } from 'next-i18next';

import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import { LanguageToggle, Logo } from '.';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useLocalChange } from 'hooks/useLocalChange';

export const Header = () => {
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
            <div className="flex items-center gap-10">
              <Search />

              <Link href="" className="">
                <a
                  className="flex !h-[44px] !w-[196px] items-center justify-center
                rounded-md bg-blue-500 text-white transition
                duration-300 ease-in-out hover:bg-yellow-200 hover:text-slate-600 focus:bg-yellow-200 focus:text-slate-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('help')}
                </a>
              </Link>

              <LanguageToggle
                handleLocaleChange={handleLocaleChange}
                value={router.locale}
              />
            </div>
          ) : (
            <button type="button" onClick={() => console.log('Click')}>
              <Bars3Icon className="h-7 w-7 text-slate-50 transition-all hover:text-yellow-200 focus:text-yellow-200" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
