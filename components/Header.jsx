import React from 'react';
import { useRouter } from 'next/router';

export const Header = () => {
  const router = useRouter();

  const handleLocaleChange = event => {
    const value = event.target.value;

    router.push(router.route, router.asPath, {
      locale: value,
    });
  };

  return (
    <header>
      <select onChange={handleLocaleChange} value={router.locale}>
        <option value="ru">RU</option>
        <option value="uk">{'uk' && 'UA'}</option>
      </select>
    </header>
  );
};