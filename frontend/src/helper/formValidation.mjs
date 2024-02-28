import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("enter a valid email")
    .required("email is required"),
  password: yup.string().min(4).required("password is required"),
});

export const registerSchema = yup.object({
  name: yup.string().required("name can't be empty"),
  email: yup
    .string()
    .email("enter a valid email")
    .required("email is required"),
  password: yup.string().min(4).required("password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match")
    .required("please confirm your password"),
});
