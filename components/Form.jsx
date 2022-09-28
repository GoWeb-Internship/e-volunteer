import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import useFormPersist from 'react-hook-form-persist';
import * as yup from 'yup';

import sendMessageToTg from '../services/telegramApi';
import TextField from '@material-ui/core/TextField';

export const Form = () => {
  const { t } = useTranslation('common');

  const [showModal, setShowModal] = useState(false);

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .required(t('nameRequired'))
      .email()
      .min(10, t('emailMin'))
      .max(63, t('emailMax'))
      .matches(
        /^[a-zA-Z0-9zñáéíóúüŁłĄąĘęŃńÓóŹźŻż.]{1}[a-zA-Z0-9zñáéíóúüŁłĄąĘęŃńÓóŹźŻż._-]{1,}[a-zA-Z0-9zñáéíóúüŁłĄąĘęŃńÓóŹźŻż.]{1}@[a-zA-Z0-9zñáéíóúüŁłĄąĘęŃńÓóŹźŻż.-]+.[a-zA-Z]{2,4}$/,
        t('emailMatch'),
      ),
    name: yup
      .string()
      .trim()
      .required(t('nameRequired'))
      .min(3, t('nameMin'))
      .max(100, t('nameMax')),
    last: yup
      .string()
      .trim()
      .required(t('nameRequired'))
      .min(3, t('nameMin'))
      .max(100, t('nameMax')),
    cellphone: yup
      .string()
      .trim()
      .required(t('nameRequired'))
      .min(9, t('phoneMin'))
      .max(18, t('phoneMax')),
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

  useFormPersist('storageKey', {
    watch,
    setValue,
  });
  useFormPersist('form', { watch, setValue });

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
    setShowModal(`thank you ${data.name} for your message`);
    reset();

    //TELEGRAM

    let message = `
      <b>Остались вопросы?:</b>
      Name: ${data.name}
      last name: ${data.last}
      Email: ${data.email}
      Phone: ${data.cellphone}
      Text: ${data.textN}


      <b>Additional information:</b>
      <i>Form name: contact</i>
      <i>Form send from:</i>
      <a href="http://localhost:3000/form">http://localhost:3000/form</a>
      ------
      `;
    sendMessageToTg(message);

    // .then(() => {
    //   openModal(true);
    // })
    // .catch(error => alert(error))
  };

  return (
    <div>
      <div className="container">
        <h2>{t('textForm')}</h2>
        <p>{t('write')}</p>
        <form
          className="form"
          method="POST"
          name="contact"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField label={t('name')} {...register('name')} />
          <span className="text-red-600 ">{errors.name?.message}</span>
          <TextField label={t('lactName')} {...register('last')} />
          <span className="text-red-600 ">{errors.name?.message}</span>
          <TextField label="+380" {...register('cellphone')} />
          <span className="text-red-600 ">{errors.cellphone?.message}</span>
          <TextField
            label="Email"
            className="input-custom"
            {...register('email')}
          />
          <span className="text-red-600 ">{errors.email?.message}</span>
          <TextField
            label="Текст"
            className="input-custom"
            {...register('textN')}
          />
          <span className="text-red ">{errors.offers?.message}</span>
          <button
            className="btn"
            type="submit"
            onClick={() => setShowModal(true)}
          >
            Відправити
          </button>
        </form>
        {showModal ? (
          <div className="absolute mt-10 flex h-auto w-72 flex-col items-center justify-center rounded-lg bg-slate-600 p-2 shadow-xl">
            <h2 className="mx-4 mt-2 text-center text-base font-semibold text-gray-400">
              {t('gratitude')}
            </h2>
            <button
              className="my-5 h-10 w-auto rounded-md bg-blue-600 px-8 font-semibold text-white shadow hover:shadow-lg"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
