import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs } from "@/interfaces/interfaces";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("email")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <input {...register("email", { required: true })} />
      <input {...register("password", { required: true })} />

      {/* errors will return when field validation fails  */}
      {errors.email && <span>This field is required</span>}
      {errors.password && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
};

export default Login;
