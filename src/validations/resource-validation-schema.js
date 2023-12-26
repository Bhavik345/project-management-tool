import * as Yup from "yup";

export const ResourceSchema = Yup.object().shape({
  availability: Yup.string().required("Availability is required"),
  role: Yup.string().required("Role is required"),
  employee: Yup.string().required("Employee is required"),
});
