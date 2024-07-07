import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("enter a valid email")
    .required("email is required"),
  password: yup.string().required("password is required"),
});

export const registerSchema = yup.object({
  name: yup.string().required("name can't be empty"),
  email: yup
    .string()
    .email("enter a valid email")
    .required("email is required"),
  password: yup.string().min(6).required("password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match")
    .required("please confirm your password"),
});

export const shippingSchema = yup.object({
  address: yup.string().required("address field is required!"),
  city: yup.string().required("city field is required"),
  postalCode: yup
    .number("Postal code must be a number") // Custom error message for not a number
    .positive("")
    .min(4, "Postal code must be at least 4 digits") // Custom error message for minimum length
    .required("Pin code is required"),
  country: yup.string().required("country field is required"),
});

export const profileSchema = yup.object({
  name: yup
    .string()
    .matches(/^[^0-9]*$/, "Name cannot contain numbers")
    .notRequired(),
  email: yup.string().email("enter a valid email").notRequired(),
  password: yup.string().notRequired(),
  confirmPassword: yup.string().when("password", {
    is: (password) => password && password.length > 0,
    then: () =>
      yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    otherwise: () =>
      yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .notRequired(),
  }),
});
