import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useFormPersist from 'react-hook-form-persist';
import * as yup from 'yup';
import sendMessageToTg from '../../services/telegramApi';
import TextField from '@material-ui/core/TextField';

export const FormEst = () => {
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

  useFormPersist('storageKey', {
    watch,
    setValue,
  });
  useFormPersist('form', { watch, setValue });

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
    reset();

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
    sendMessageToTg(message);
  };

  return (
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
          className="btn mx-auto w-full max-w-[280px] sm:w-[280px] sm:max-w-none md:mr-auto md:ml-0 md:w-[384px]"
          type="submit"
        >
          Saada
        </button>
      </form>
    </div>
  );
};
