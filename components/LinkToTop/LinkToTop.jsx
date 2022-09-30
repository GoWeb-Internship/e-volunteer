import { ArrowLongUpIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-scroll';

export const LinkToTop = () => {
  return (
    <Link
      to="banner"
      smooth={true}
      hashSpy={true}
      className="fixed bottom-10 right-5 h-12 w-12 rounded-full bg-yellow-200 transition duration-300 ease-in-out hover:bg-yellow-300 md:right-6"
    >
      <ArrowLongUpIcon className="absolute top-1/2 left-1/2 h-6 w-6 translate-y-[-50%] translate-x-[-50%]" />
    </Link>
  );
};
