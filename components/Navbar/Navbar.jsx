import React, { useState }  from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { Selected } from '../Selected/Selected';
import { Logo } from '../Logo/Logo';
import { Search } from '../../views/Search';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

export const Navbar = ({slugs}) => {
  const { t } = useTranslation('common'); 
   const [nav, setNav] = useState(false);

  return (
   
    <div className='container '>
  
    <div className="box">
      <ul
        className={
          nav ? ["menu", "active"].join(' ') : ["menu"]
        }
      >
        <li className='w-full h-[80px] z-50 bg-headerBg flex pl-[20px] pr-[20px] justify-between items-center'>
        <Logo/>
        <Selected/>
        <a href='' ><span className='text-white'>X</span></a>
        </li>
        <li className='pb-[20px] pt-[20px] pl-[60px] items-center'>
            <Search/>
        </li>
            {slugs &&
          slugs.map((slug, idx) => (
              <li className=" text-textForm  text-xl font-normal z-20 " key={idx}>
              <Link href={`/${slug.href}`} >
                <a onClick={() => setNav(!nav)}>{slug.title}</a>
              </Link>
            </li>
          ))}
          <button className=" mr-[21px] !h-[44px] !mb-0 !w-[194px] !mb-20px !mt-[20px] rounded-md bg-btnForm text-lg font-medium  text-white ">
          <Link href="">{t('help')}</Link>
        </button>
        <div className="md:hidden">
        <Image
          width="286px"
          height="100%"
          src="/img/menuBg.svg"
          className=" object-cover"
          alt="shadow"
        />
      </div>
      </ul>
      <button onClick={() => setNav(!nav)} className="mobile_btn">
        {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </button>

    </div>
  </div>
  );
};

