import * as yup from "yup";

export const employeeSchema = yup.object().shape({
  name: yup.string().required("Name is required"),

  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),

  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});
