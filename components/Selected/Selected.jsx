import React from 'react';
import { useRouter } from 'next/router';


export const Selected = () => {
  const router = useRouter();

  const handleLocaleChange = event => {
    const value = event.target.value;

    router.push(router.route, router.asPath, {
      locale: value,
    });
  };

  return (
     <select
       onChange={handleLocaleChange}
       value={router.locale}
       className=" h-[35px] w-[76px] ml-[120px] rounded-lg pt-[5px] md:block"
     >
       <option className="z-1" value="ru">
         RU
       </option>
       <option className="z-1" value="uk">
         UA
       </option>
     </select>
  );
};
