import { useRouter } from 'next/router';

export const useLocalChange = () => {
  const router = useRouter();

  const handleLocaleChange = event => {
    const value = event.target.value;

    router.push(router.route, router.asPath, {
      locale: value,
    });
  };

  return [router, handleLocaleChange];
};
