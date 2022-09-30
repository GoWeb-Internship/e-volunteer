import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useMediaQuery } from 'react-responsive';
import Mail from '@/public/img/svg/mailIcon.svg';
import NotifyTop from '@/public/img/svg/notifyTop.svg';
import NotifyBottom from '@/public/img/svg/notifyBottom.svg';

export const Notification = ({ isOpen, closeModal, title, text, link }) => {
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-button bg-opacity-70 blur-xl" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {isTablet ? (
                <Dialog.Panel className="relative rounded-2xl bg-blue-200 md:block md:px-[160px] md:py-[120px] xl:px-[215px]">
                  <NotifyTop className="absolute top-5 left-0 hidden md:block md:w-[171px] xl:top-6 xl:w-[227px]" />
                  <NotifyBottom className="absolute bottom-6 right-0 hidden md:block md:w-[134px] xl:w-[188px]" />
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-11 right-11 hidden md:block"
                    aria-label="close notify"
                    aria-controls="close notify"
                  >
                    <XMarkIcon className="h-6 w-6 text-slate-50" />
                  </button>
                  <div className="pointer-events-auto relative w-full max-w-md rounded-2xl bg-slate-50 px-[54px] pt-[100px] pb-[59px] shadow-lg">
                    <div className="flex flex-col items-center justify-center p-5">
                      <Mail className="w-[94px]" />
                      <div className="mt-8">
                        <p className="text-center text-xl font-medium text-slate-600">
                          {title}
                        </p>
                        <p className="mt-5 text-center text-base text-slate-600">
                          {text}
                        </p>
                        <a
                          className="text-button hover:underline focus:underline"
                          rel="noopener noreferrer nofollow"
                          target="_blank"
                          href="https://web.telegram.org/"
                        >
                          {link}
                        </a>
                      </div>

                      <button
                        type="button"
                        onClick={closeModal}
                        className="absolute top-6 right-6 md:hidden"
                        aria-label="close notify"
                        aria-controls="close notify"
                      >
                        <XMarkIcon className="h-6 w-6 text-button" />
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              ) : (
                <Dialog.Panel className="pointer-events-auto relative w-full max-w-md rounded-2xl bg-slate-50 px-[54px] pt-[100px] pb-[59px] shadow-lg">
                  <div className="flex flex-col items-center justify-center p-5">
                    <Mail className="w-[94px]" />
                    <div className="mt-8">
                      <p className="text-center text-xl font-medium text-slate-600">
                        {title}
                      </p>
                      <p className="mt-5 text-center text-base text-slate-600">
                        {text}
                      </p>
                      <a
                        className="text-button hover:underline focus:underline"
                        rel="noopener noreferrer nofollow"
                        target="_blank"
                        href="https://web.telegram.org/"
                      >
                        {link}
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="absolute top-6 right-6 md:hidden"
                      aria-label="close notify"
                      aria-controls="close notify"
                    >
                      <XMarkIcon className="h-6 w-6 text-button" />
                    </button>
                  </div>
                </Dialog.Panel>
              )}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
