import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import PageFlower from 'public/img/svg/pageFlower.svg';
import { Form } from '..';

const needs = [
  'riided',
  'kingad',
  'hügieenitooted',
  'koolitarbed',
  'mööbliesemed',
  'toit',
  'ja muud',
];

export const Modal = ({ isOpen, closeModal }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
              <Dialog.Panel className=" relative w-full max-w-[1280px] transform overflow-hidden rounded-[20px] bg-slate-50 transition-all xl:flex">
                <div className="rounded-[20px] bg-blue-200 px-5 pb-[38px] pt-[60px] md:px-9 md:pt-[100px] md:pb-[64px] xl:pl-[80px] xl:pb-[100px]">
                  <Dialog.Title
                    as="h3"
                    className="text-start text-[34px] font-medium leading-[39px] text-slate-600"
                  >
                    Kallid Eestimaa elanikud!
                  </Dialog.Title>
                  <p className="mt-8 max-w-[529px] text-start text-xl text-slate-600">
                    Kahjuks sõjapõgenikud Ukrainast jätkuvalt tulevad Eestisse
                    ning nad vajavad teie abi ja tuge! Saate vaadata, mida
                    inimesed vajavad, või pakkuda teie abi meie telegrammi
                    kanalis.
                  </p>
                  <p className="mt-3 text-start text-xl text-slate-600">
                    Tavaliselt on need põhilised asjad:
                  </p>
                  <ul className="mb-8 list-inside list-disc text-start">
                    {needs.map(item => (
                      <li key={item} className="mt-3 ">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <PageFlower className="mx-auto w-[230px] sm:w-[360px] md:w-[424px]" />
                </div>
                <div className="bg-slate-50 pb-[38px] xl:pt-[100px]">
                  <Form />
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute top-6 right-6 lg:top-11 lg:right-11"
                  aria-label="Зачинити модальне вікно"
                  aria-controls="close PopUp"
                >
                  <XMarkIcon className="h-6 w-6 text-button" />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
