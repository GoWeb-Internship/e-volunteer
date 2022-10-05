import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { useLocalChange } from 'hooks/useLocalChange';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { LanguageToggle, Logo } from '..';
import { useTranslation } from 'next-i18next';
import { Search } from 'views';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';

export const MobileMenu = ({ slugs }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [router, handleLocaleChange] = useLocalChange();
  const { t } = useTranslation('common');
  const isMobileScreen = useMediaQuery({ query: '(min-width: 480px)' });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button type="button" onClick={toggleModal}>
        <Bars3Icon className="h-7 w-7 text-slate-50 transition-all hover:text-yellow-200 focus:text-yellow-200" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className=" relative z-10" onClose={toggleModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" h-screen w-full transform overflow-auto bg-gradient-to-b from-blue-200 to-white transition-all">
                  <div className=" bg-blue2 py-3">
                    <div className="container">
                      <div className="flex items-center justify-between">
                        <Logo />

                        <div className="flex items-center gap-10">
                          <LanguageToggle
                            handleLocaleChange={handleLocaleChange}
                            locale={router.locale}
                          />

                          <button type="button" onClick={toggleModal}>
                            <XMarkIcon className="h-7 w-7 text-slate-50 transition-all hover:text-slate-300 focus:text-slate-300" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pt-9 pb-8 sm:px-24">
                    <Search />

                    <ul className="mt-10 mb-[60px] flex flex-col gap-5">
                      {slugs &&
                        slugs.map(({ href, title }) => (
                          <li
                            className="text-xl leading-[1.24] text-slate-600"
                            key={href}
                          >
                            <Link href={`/${href}`}>
                              <a onClick={toggleModal}>{title}</a>
                            </Link>
                          </li>
                        ))}
                    </ul>

                    <Link href="">
                      <a
                        className="mx-auto mb-6 flex !h-[44px] !w-[196px] items-center justify-center rounded-xl bg-blue-500 text-white transition duration-300 ease-in-out hover:bg-yellow-200 hover:text-slate-600 focus:bg-yellow-200 focus:text-slate-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('help')}
                      </a>
                    </Link>

                    {isMobileScreen ? (
                      <Image
                        src="/img/mobile/mobile-480.svg"
                        alt="decor"
                        width="478px"
                        height="176px"
                      />
                    ) : (
                      <Image
                        src="/img/mobile/mobile-320.svg"
                        alt="decor"
                        width="286px"
                        height="105px"
                      />
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

MobileMenu.propTypes = {
  slugs: PropTypes.arrayOf(PropTypes.object),
};
