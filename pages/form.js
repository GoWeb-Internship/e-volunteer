import React from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import sendMessageToTg from '../services/telegramApi';
import TextField from "@material-ui/core/TextField";
import useFormPersist from 'react-hook-form-persist';
// import { useRouter } from 'next/router';
// import ru from '../locales/ru/form'
// import uk from '../locales/uk/form';
import useTranslation from "next-translate/useTranslation";





export default function form() {
  // const router = useRouter();
  // const { locale } = router;
  // const t = locale === 'ru' ? ru : uk;
  let { t } = useTranslation();

    const formSchema = yup.object().shape({
        email: yup.string().trim().required().email().min(10)
        .max(63) .matches(
          /^[a-zA-Z0-9zñáéíóúüŁłĄąĘęŃńÓóŹźŻż.]{1}[a-zA-Z0-9zñáéíóúüŁłĄąĘęŃńÓóŹźŻż._-]{1,}[a-zA-Z0-9zñáéíóúüŁłĄąĘęŃńÓóŹźŻż.]{1}@[a-zA-Z0-9zñáéíóúüŁłĄąĘęŃńÓóŹźŻż.-]+.[a-zA-Z]{2,4}$/,
       ),
        name: yup.string().trim().required().min(3).max(100),
        last: yup.string().trim().required().min(3).max(100),
        cellphone: yup.string().trim().required().min(9).max(18),  
        textN:  yup.string().required().min(10).max(2000),  
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
        <TextField label={t("common:name")}    {...register("name")} />
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
