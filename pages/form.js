import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import sendMessageToTg from '../services/telegramApi';
import TextField from '@material-ui/core/TextField';
import useFormPersist from 'react-hook-form-persist';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export default function form() {
  const { t } = useTranslation('common');

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .required(t('nameRequired'))
      .email()
      .min(10, (t('emailMin')))
      .max(63, (t('emailMax')))
      .matches(
        /^[a-zA-Z0-9zñáéíóúüŁłĄąĘęŃńÓóŹźŻż.]{1}[a-zA-Z0-9zñáéíóúüŁłĄąĘęŃńÓóŹźŻż._-]{1,}[a-zA-Z0-9zñáéíóúüŁłĄąĘęŃńÓóŹźŻż.]{1}@[a-zA-Z0-9zñáéíóúüŁłĄąĘęŃńÓóŹźŻż.-]+.[a-zA-Z]{2,4}$/, (t('emailMatch'))
      ),
    name: yup.string().trim().required(t('nameRequired')).min(3, (t('nameMin'))).max(100, (t('nameMax'))),
    last: yup.string().trim().required(t('nameRequired')).min(3, (t('nameMin'))).max(100, (t('nameMax'))),
    cellphone: yup.string().trim().required(t('nameRequired')).min(9, (t('phoneMin'))).max(18, (t('phoneMax'))),
    textN: yup.string().required(t('nameRequired')).min(10, (t('textMin'))).max(2000, (t('textMax'))),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  useFormPersist('storageKey', {
    watch,
    setValue,
  });
  useFormPersist('form', { watch, setValue });

  const onSubmit = data => {
    console.log(data);
    //TELEGRAM

    let message = `
      <b>Остались вопросы:</b>
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
        <h2>Form</h2>
        <form className="form" method="POST" onSubmit={handleSubmit(onSubmit)}>
          <TextField label={t('name')} {...register('name')} />
          <span className='text-red-600 '>{errors.name?.message}</span>
          <TextField label={t('lactName')} {...register('last')} />
          <span className='text-red-600 '>{errors.name?.message}</span>
          <TextField label="+380" {...register('cellphone')} />
         <span className='text-red-600 '>{errors.cellphone?.message}</span>
          <TextField
            label="Email"
            className="input-custom"
            {...register('email')}
          />
          <span className='text-red-600 '>{errors.email?.message}</span>
          <TextField
            label="Текст"
            className="input-custom"
            {...register('textN')}
          />
         <span className='text-red '>{errors.offers?.message}</span> 
          <button className="btn" type="submit">
            Відправити
          </button>
        </form>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}