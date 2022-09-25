import React from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import sendMessageToTg from '../services/telegramApi';
import TextField from "@material-ui/core/TextField";
import useFormPersist from 'react-hook-form-persist';
import { useRouter } from 'next/router';
import ru from '../locales/ru';
import uk from '../locales/uk';




export default function form() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'ru' ? ru : uk;

    const formSchema = yup.object().shape({
        email: yup.string().trim().required(t.nameRequired).email(t.emailMatch).min(10, t.emailMin)
        .max(63, t.emailMax) .matches(
          /^[a-zA-Z0-9zñáéíóúüŁłĄąĘęŃńÓóŹźŻż.]{1}[a-zA-Z0-9zñáéíóúüŁłĄąĘęŃńÓóŹźŻż._-]{1,}[a-zA-Z0-9zñáéíóúüŁłĄąĘęŃńÓóŹźŻż.]{1}@[a-zA-Z0-9zñáéíóúüŁłĄąĘęŃńÓóŹźŻż.-]+.[a-zA-Z]{2,4}$/,
        t.nameRequired),
        name: yup.string().trim().required(t.nameRequired).min(3, t.nameMin).max(100, t.nameMax),
        last: yup.string().trim().required(t.nameRequired).min(3, t.nameMin).max(100, t.nameMax),
        cellphone: yup.string().trim().required(t.nameRequired).min(9, t.phoneMin).max(18, t.phoneMax),  
        textN:  yup.string().required(t.nameRequired).min(10, t.textMin).max(2000, t.textMax),  
      });
    
      const {
        register,
        handleSubmit,
        watch,
        setValue ,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(formSchema)
      });

      useFormPersist("storageKey", {
        watch, 
        setValue,
      });
      useFormPersist ( 'form' ,  { watch , setValue } ) ;

      const onSubmit =  (data) => {
        console.log(data)
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
      sendMessageToTg(message)
     
      .then(() => {
        openModal(true);
      })
      .catch(error => alert(error))
      };
      

  return (
    <div>
      <div className="container">
      <h2>Form</h2>
      <form className="form" method="POST" onSubmit={handleSubmit(onSubmit)}>
        <TextField label={t.name} z   {...register("name")} />
        {errors.name?.message}
        <TextField label={t.lactName}  {...register("last")} />
        {errors.name?.message}
        <TextField label="+380"   {...register("cellphone")} />
        {errors.cellphone?.message}
        <TextField label="Email" className="input-custom" {...register("email")} />
        {errors.email?.message}
        <TextField label="Текст" className="input-custom" {...register("textN")} />
        {errors.offers?.message}
        <button className='btn' type="submit" >Відправити</button>
      </form>
    </div>
    </div>
  )
}
