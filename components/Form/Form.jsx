import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import useFormPersist from 'react-hook-form-persist';
import * as yup from 'yup';
import {
  fotoIcons,
  formContainer,
  formGl,
  formText,
  iconsForm,
} from './Form.module.css';
import Image from 'next/image';
import sendMessageToTg from '../../services/telegramApi';
import TextField from '@material-ui/core/TextField';
import { Notification, ScreenLoader } from '..';

export const Form = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { t } = useTranslation('common');

  const isBrowser = typeof window !== 'undefined';

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t('nameRequired'))
      .min(3, t('nameMin'))
      .max(100, t('nameMax')),
    textN: yup
      .string()
      .required(t('nameRequired'))
      .min(10, t('textMin'))
      .max(2000, t('textMax')),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    isLoading
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
  }, [isLoading]);

  useFormPersist('form', {
    watch,
    setValue,
    storage: isBrowser ? sessionStorage : null,
  });

  const onSubmit = async (data, e) => {
    setIsLoading(true);
    try {
      e.preventDefault();

      //TELEGRAM

      let message = `
      <b>Остались вопросы?:</b>
      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.cellphone}
      Text: ${data.textN}


      <b>Additional information:</b>
      <i>Form name: contact</i>
      <i>Form send from:</i>
      <a href="https://e-volunteer.netlify.app/">https://e-volunteer.netlify.app/</a>
      ------
      `;
      await sendMessageToTg(message);
      openModal();
      reset();
      sessionStorage.removeItem('form');
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setIsLoading(false);

      setTimeout(() => {
        setError(false);
      }, 4000);
    }
  };

  return (
    <>
      {error && (
        <ScreenLoader error={error}>
          <p className="text-[30px] font-medium leading-[46px] text-button md:text-[40px] md:leading-[44px]">
            {t('error')}
          </p>
        </ScreenLoader>
      )}

      {isLoading && (
        <ScreenLoader>
          <p className="text-[30px] font-medium leading-[46px] text-button md:text-[40px] md:leading-[44px]">
            {t('loading')}
          </p>
        </ScreenLoader>
      )}

      <section>
        <div className="container relative">
          <div className="flex items-center justify-between">
            <div className="my-auto hidden md:block xl:hidden">
              <Image
                width="212px"
                height="613px"
                src="/img/form/plForm.svg"
                className=" object-cover"
                alt="shadow"
              />
            </div>

            <div className={fotoIcons}>
              <Image
                layout="fill"
                src="/img/form/descForm.svg"
                className="absolute"
                alt="shadow"
              />
            </div>

            <div className={formContainer}>
              <h2 className={formGl}>{t('textForm')}</h2>
              <div className="flex ">
                <p className={formText}>{t('write')}</p>
                <div className="sm:hidden">
                  <Image
                    width="74px"
                    height="76px"
                    src="/img/form/iconForm.svg"
                    className="object-cover sm:block"
                    alt="shadow"
                  />
                </div>
                <div className={iconsForm}>
                  <Image
                    width="168px"
                    height="171px"
                    src="/img/form/iconForm.svg"
                    className=" -pt-[40px] object-cover"
                    alt="shadow"
                  />
                </div>
              </div>

              <form
                className="form xl:mr-[140px]"
                method="POST"
                name="contact"
                onSubmit={handleSubmit(onSubmit)}
              >
                <TextField
                  label={t('name')}
                  {...register('name')}
                  className="border-none outline-none"
                />
                <span className="text-red-600 ">{errors.name?.message}</span>
                <TextField label="+380" {...register('cellphone')} />
                <span className="text-red-600 ">
                  {errors.cellphone?.message}
                </span>
                <TextField
                  label="Email"
                  className="input-custom"
                  {...register('email')}
                />
                <span className="text-red-600 ">{errors.email?.message}</span>
                <TextField
                  label="Текст"
                  className="!pt-[128px] md:!pt-[75px]"
                  {...register('textN')}
                />
                <span className="text-red ">{errors.offers?.message}</span>

                <button
                  className="${className} mt-[52px] w-[220px] rounded-[20px] bg-blue2 py-[14px] text-center text-lg font-medium text-slate-50 transition duration-300 ease-in-out hover:bg-yellow-200 hover:text-slate-600 focus:bg-yellow-200 focus:text-slate-600 sm:w-[298px] xl:w-[300px]"
                  type="submit"
                >
                  {t('formBtn')}
                </button>
              </form>
            </div>
          </div>
        </div>

        <Notification
          isOpen={isOpen}
          closeModal={closeModal}
          title={t('notifyTitle')}
          text={t('notifyText')}
          link={t('notifyLink')}
        />
      </section>
    </>
  );
};
