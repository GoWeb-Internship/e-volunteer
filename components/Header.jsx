import React from 'react';
import Link from 'next/link';
import { Search } from '../views/Search';
import { useTranslation } from 'next-i18next';
import { Logo } from '../components/Logo/Logo';
import { Navbar } from './Navbar/Navbar';
import { Selected } from '../components/Selected/Selected';

export const Header = () => {
  const { t } = useTranslation('common');
 

  return (
    <header className="bg-headerBg pt-[12px] pb-[12px] h-[68px]">
      <div className="container">
        <div className=" flex items-center">
          <div className='flex justify-evenly'>
          <Logo />
          <Navbar/>
          </div>
          <Search className="hidden"/>
          <div>
            <button className="hidden md:block mr-[21px] !h-[44px]  !w-[196px] rounded-md bg-blue-600  text-white ">
              <Link href="">{t('help')}</Link>
            </button>
          </div>
          <Selected/>
        </div>
      </div>
    </header>
  );
};
