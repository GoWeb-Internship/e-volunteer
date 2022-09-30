import React  from 'react';
// import { Search } from '../views/Search';
import { Logo } from '../components/Logo/Logo';
import { Navbar } from '../components/Navbar/Navbar';
import { SearchBtn } from '../components/SearchBtn/SearchBtn';
// import { HeaderDesc } from '../components/HeaderDesc/HeaderDesc';
import { BtnHeader } from '../components/BtnHeader/BtnHeader';
// import { Selected } from '../components/Selected/Selected';
import { useRouter } from 'next/router';


export const Header = ({slugs}) => {
  const router = useRouter();

  const handleLocaleChange = event => {
    const value = event.target.value;

    router.push(router.route, router.asPath, {
      locale: value,
    });
  };
  return (
    <header className="bg-bgHeader pt-[12px] pb-[12px] h-[68px]">
      <div className="container">
        <div className=" flex items-center">
          
          <div className='flex justify-evenly'>
          <Logo />
          <div><span className=''>=</span></div>
          
        <Navbar slugs={slugs}/>
          </div>
          <SearchBtn/>
          <BtnHeader/>
          <select
       onChange={handleLocaleChange}
       value={router.locale}
       className="hidden h-[35px] w-[76px]  rounded-lg pt-[5px] md:block"
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
