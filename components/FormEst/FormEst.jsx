import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useFormPersist from 'react-hook-form-persist';
import * as yup from 'yup';
import sendMessageToTg from '../../services/telegramApi';
import TextField from '@material-ui/core/TextField';
import { Notification, ScreenLoader } from '..';

export const FormEst = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isBrowser = typeof window !== 'undefined';

  const formSchema = yup.object().shape({
    name: yup.string().trim().required().min(3).max(100),
    textN: yup.string().required().min(10).max(2000),
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

  useFormPersist('formEst', {
    watch,
    setValue,
    storage: isBrowser ? sessionStorage : null,
  });

  useEffect(() => {
    isLoading
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
  }, [isLoading]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const onSubmit = async (data, e) => {
    setIsLoading(true);
    try {
      e.preventDefault();
      //TELEGRAM

      let message = `
      <b>Kirjuta meile:</b>
      Name: ${data.name}
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
      sessionStorage.removeItem('formEst');
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
            Oops! Midagi läks valesti.
          </p>
          <p className="text-[28px] font-normal leading-[36px] text-button md:text-[40px] md:leading-[24px]">
            Proovi uuesti
          </p>
        </ScreenLoader>
      )}
      {isLoading && (
        <ScreenLoader>
          <p className="text-[30px] font-medium leading-[46px] text-button md:text-[40px] md:leading-[44px]">
            Palun oodake, teie taotlust töödeldakse
          </p>
        </ScreenLoader>
      )}
      <div className="mx-auto max-w-[440px] md:w-[480px] md:max-w-none xl:ml-[128px] xl:w-[414px]">
        <h3 className="pb-[17px] text-2xl font-medium text-textForm md:text-4xl md:font-normal">
          Kirjuta meile
        </h3>
        <form
          className="form "
          method="POST"
          name="contact"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField label="Nimi" {...register('name')} />
          <span className="text-red-600 ">{errors.name?.message}</span>
          <TextField
            label="Mida ma võin pakkuda"
            className="!pt-[128px] md:!pt-[75px]"
            {...register('textN')}
          />
          <span className="text-red ">{errors.offers?.message}</span>
          <button
            className="btn mx-auto  w-full max-w-[280px] rounded-[20px] sm:w-[280px] sm:max-w-none md:mr-auto md:ml-0 md:w-[384px]"
            type="submit"
          >
            Saada
          </button>
        </form>
        <Notification
          isOpen={isOpen}
          closeModal={closeModal}
          title="Aitäh vastuse eest!"
          text="Oodake vastust"
          link="Telegrami kanalis"
        />
      </div>
    </>
  );
};
