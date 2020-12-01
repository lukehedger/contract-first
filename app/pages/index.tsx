import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateYupSchema } from "../util/generate-yup-schema";
import { SubmitRequest } from "../../types/submit-request";

const HomePage = (): ReactElement => {
  const yupSchema = generateYupSchema();

  const { register, handleSubmit, errors } = useForm<SubmitRequest>({
    resolver: yupResolver(yupSchema),
  });

  const onSubmit = (data: SubmitRequest) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" name="message" ref={register} />
      <p>{errors.message?.message}</p>

      <input type="text" name="status" ref={register} />
      <p>{errors.status?.message}</p>

      <input type="submit" />
    </form>
  );
};

export default HomePage;
