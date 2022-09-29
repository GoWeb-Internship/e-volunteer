import React from 'react';
import Link from 'next/link';
import {Logo}  from './Logo/Logo';
import { useTranslation } from 'next-i18next';
import   Teleg  from '../public/img/teleg.svg';



export const Footer = ({slugs}) => {
  const { t } = useTranslation('common');
    
  return (
  
    <footer className='bg-blue-400'>
       <div className='ml-[80px] mr-[80px]'>
      <div className='flex justify-between pb-[24px] pt-[24px] border-b-2'>
      <Logo/>
    <div className='flex '><p className='text-white pr-[19px]'>{t('telegram')}</p>
    <Link href="https://web.telegram.org/z/">
        <a href="https://web.telegram.org/z/" aria-label="логотип">
          <Teleg className="w-[22px]" />
        </a>
      </Link>
    </div>
    </div>
    <ul className='flex pb-[32px] text-center justify-around pt-[32px]'>
    {slugs && slugs.map((slug, idx) => (
      <li className='pl-[20px] text-white ' key={idx}>
        <Link href={`/${slug.href}`}>
          <a>{slug.title}</a>
        </Link>
      </li>
    ))}
  </ul>
  <p className='border-b-2 text-center pb-[24px] text-white'>{t('textFooter')}</p>
  <div className='flex pb-[24px] pt-[20px]'>
    <span className="pr-1 text-white">&copy;</span>
    <span className="text-white ">{new Date().getFullYear()}</span>
    <p className='text-white pl-1'>E-VOLONTEER</p>
  </div>

  </div>
  </footer>
  );
}

