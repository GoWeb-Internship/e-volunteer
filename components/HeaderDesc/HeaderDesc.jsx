import React  from 'react';
import { Logo } from '../../components/Logo/Logo';
import { Search } from '../../views/Search';
import { BtnHeader } from '../../components/BtnHeader/BtnHeader';
import { Selected } from '../../components/Selected/Selected';


export const HeaderDesc = () => {
  return (
    <header className="bg-bgHeader pt-[12px] pb-[12px] h-[68px]">
      <div className="container">
        <div className=" flex items-center">
          <div className='flex justify-evenly'>
          <Logo />

          </div>
          <Search/>
          <BtnHeader/>
          <Selected/>
        </div>
      </div>
    </header>
  );
};
