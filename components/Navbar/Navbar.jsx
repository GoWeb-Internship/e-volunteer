import React, { useState } from 'react';
import style from './Navbar.module.css';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

export const Navbar = ({slugs}) => {
  const [nav, setNav] = useState(false);


  return (
      <div className='container'>
        <div className={style.box}>
        <div className={style.logo_image}>
          </div>
          <ul
            className={
              nav ? [style.menu, style.active].join(' ') : [style.menu]
            }
          >
            
            {/* <li>
              <a href='##'>Product</a>
            </li>
            <li>
              <a href='##'>About Us</a>
            </li>
            <li>
              <a href='##'>Customers</a>
            </li>
            <li>
              <a href='##'>Price</a>
            </li>
            <li>
              <a href='##'>Contacts</a>
            </li> */}
             {/* <ul className="flex justify-around pb-[32px] pt-[32px] text-center"> */}
            {slugs &&
              slugs.map((slug, idx) => (
                  <li className="pl-[20px] text-red-600 " key={idx}>
                    <a href='##'>
                  <Link href={`/${slug.href}`}>
                    <a>{slug.title}</a>
                  </Link>
                  </a>
                </li>
              ))}
          {/* </ul> */}
          </ul>
          <div onClick={() => setNav(!nav)} className={style.mobile_btn}>
            {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
          </div>
        </div>
      </div>
  );
};
