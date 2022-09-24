import React from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import sendMessageToTg from '../services/telegramApi';
import TextField from "@material-ui/core/TextField";
import useFormPersist from 'react-hook-form-persist'



export default function form() {

    const formSchema = yup.object().shape({
        email: yup.string().required("поле обовязкове для заповнення").email("E-mail не коректний") .matches(
          /^[a-zA-Z0-9zñáéíóúüŁłĄąĘęŃńÓóŹźŻż.]{1}[a-zA-Z0-9zñáéíóúüŁłĄąĘęŃńÓóŹźŻż._-]{1,}[a-zA-Z0-9zñáéíóúüŁłĄąĘęŃńÓóŹźŻż.]{1}@[a-zA-Z0-9zñáéíóúüŁłĄąĘęŃńÓóŹźŻż.-]+.[a-zA-Z]{2,4}$/,
          'ПОЛЕ МІСТИТЬ ПОМИЛКУ',
        ),
        name: yup.string().required("поле обовязкове для заповнення").min(3, 'Мінімальна кількість символів 3')
        .max(100, 'Максимальна кількість символів 100'),
        cellphone: yup.string().required("поле обовязкове для заповнення").required("Поле обов'язкове для заповнення")
        .min(9, 'Мінімальна кількість символів 9')
        .max(18, 'Максимальна кількість символів 18'),    
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

    //   useFormPersist("storageKey", {
    //     watch, 
    //     setValue,
    //   });
    //   useFormPersist ( 'form' ,  { watch , setValue } ) ;

      const onSubmit =  (data) => {
        console.log(data)
        //TELEGRAM
    
      let message = `
      <b>Хочу допомогти:</b>
      Name: ${data.name}
      last name: ${data.last}
      Email: ${data.email}
      Phone: ${data.cellphone}
      Text: ${data.address}
      
      
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
        <TextField label="Имя"   {...register("name")} />
        {errors.name?.message}
        <TextField label="Фамилия"  {...register("last")} />
        {errors.name?.message}
        <TextField label="+380"   {...register("cellphone")} />
        {errors.cellphone?.message}
        <TextField label="Email" className="input-custom" {...register("email")} />
        {errors.email?.message}
        <TextField label="Текст" className="input-custom" {...register("address")} />
        {errors.offers?.message}
        <button className='btn' type="submit" >Відправити</button>
      </form>
    </div>
    </div>
  )
}
