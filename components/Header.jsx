import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Search } from '../views/Search';
import { useTranslation } from 'next-i18next';
import { Logo } from './Logo/Logo';

export const Header = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const handleLocaleChange = event => {
    const value = event.target.value;

    router.push(router.route, router.asPath, {
      locale: value,
    });
  };

  return (
    <header className="bg-blue-400 pt-[12px] pb-[12px]">
      <div className="container">
        <div className="ml-[80px] mr-[80px] flex items-center">
          <Logo />
          <Search />
          <div>
            <button className=" mr-[21px] !h-[44px]  !w-[196px] rounded-md bg-blue-600  text-white ">
              <Link href="">{t('help')}</Link>
            </button>
          </div>
          <select
            onChange={handleLocaleChange}
            value={router.locale}
            className="h-[35px] w-[76px] rounded-lg pt-[5px]"
          >
            <option className="z-1" value="ru">
              RU
            </option>
            <option className="z-1" value="uk">
              UA
            </option>
          </select>
        </div>
      </div>
    </header>
  );
};
