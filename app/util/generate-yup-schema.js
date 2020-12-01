import convertToYup from "json-schema-yup-transformer";
import submitRequestSchema from "../../schema/submit-request.schema.json";

export const generateYupSchema = () => {
  const yupSchema = convertToYup(submitRequestSchema, {
    errors: {
      message: {
        required: "Need a message!",
      },
    },
  });

  return yupSchema;
};
