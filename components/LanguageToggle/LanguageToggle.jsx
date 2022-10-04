import { useRouter } from 'next/router';

export const LanguageToggle = ({ handleLocaleChange, value }) => {
  const { locale } = useRouter();

  return (
    <select
      onChange={handleLocaleChange}
      value={value ?? locale}
      className="h-[35px] w-[76px] rounded-lg pt-[5px]"
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
