import Link from 'next/link';
import React from 'react';
import   LogoSite  from '../../public/img/Logo.svg';


export default function Logo() {

    
    return (
        <Link href="/">
        <a href="" aria-label="логотип">
          <LogoSite className="w-[64px]" />
        </a>
      </Link>
    );
  }
  

Logo.propTypes = {};