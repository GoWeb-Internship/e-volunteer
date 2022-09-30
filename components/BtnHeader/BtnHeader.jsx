import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'next-i18next';


export const BtnHeader = () => {
    const { t } = useTranslation('common');
  return (
    <div>
    <button className="hidden md:block mr-[21px] !h-[44px]  !w-[196px] rounded-md bg-headerBg  text-white ">
      <Link href="">{t('help')}</Link>
    </button>
  </div>
  );
};


