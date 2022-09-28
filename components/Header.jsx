import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Search } from './Search/Search';
import { useTranslation } from 'next-i18next';
import Logo  from './Logo/Logo';


export default function Header() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const handleLocaleChange = event => {
    const value = event.target.value;

    router.push(router.route, router.asPath, {
      locale: value,
    });
  };

  return (
    <header className='bg-blue-400 pt-[12px] pb-[12px]'>
      
      <div className='flex items-center ml-[80px] mr-[80px]'>
      <Logo/>
      <Search/>
      <div>
      <button className=" rounded-md bg-blue-600  mr-[21px] !w-[196px] !h-[44px]  text-white " >
      <Link href="">{t('help')}</Link></button></div>
      <select onChange={handleLocaleChange} value={router.locale} className="w-[76px] h-[35px] pt-[5px] rounded-lg">
        <option className='z-1' value="ru">RU</option>
        <option className='z-1' value="uk">UA</option>
      </select>
      
      </div>
    </header>
  );
}
