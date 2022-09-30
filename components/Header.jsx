import React, { useState }  from 'react';
import Link from 'next/link';
import { Search } from '../views/Search';
import { useTranslation } from 'next-i18next';
import { Logo } from '../components/Logo/Logo';
import Image from 'next/image';
// import { Navbar } from './Navbar/Navbar';
import { Selected } from '../components/Selected/Selected';
import { useRouter } from 'next/router';
// import style from '../components/Navbar/';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

export const Header = ({slugs}) => {
  const { t } = useTranslation('common');
  const [nav, setNav] = useState(false);
  const router = useRouter();

  const handleLocaleChange = event => {
    const value = event.target.value;

    router.push(router.route, router.asPath, {
      locale: value,
    });
  };
  return (
    <header className="bg-headerBg pt-[12px] pb-[12px] h-[68px]">
      <div className="container">
        <div className=" flex items-center">
          <div className='flex justify-evenly'>
          <Logo />
          {/* <Navbar/> */}

          <div className='container '>
        <div className="box">
          <div className=' bg-headerBg w-full flex items-center '> 
          <ul
            className={
              nav ? ["menu", "active"].join(' ') : ["menu"]
            }
          >
    
            {slugs &&
              slugs.map((slug, idx) => (
                  <li className=" text-textForm text-xl font-normal z-20 " key={idx}>
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
          <div onClick={() => setNav(!nav)} className="mobile_btn">
            {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
          </div>
          </div>
        </div>
      </div>
      


          </div>
          <Search className="hidden"/>
          <div>
            <button className="hidden md:block mr-[21px] !h-[44px]  !w-[196px] rounded-md bg-btnForm  text-white ">
              <Link href="">{t('help')}</Link>
            </button>
          </div>
          <Selected/>
        </div>
      </div>
    </header>
  );
};
