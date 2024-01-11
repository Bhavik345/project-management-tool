import * as yup from "yup";

export const projectSchema = yup.object().shape({
    projectName: yup.string().required("Project Name is required"),
    clientName: yup.string().required("Client Name is required"),
    projectDescription: yup.string().required("Project Description is required"),
    billableResource: yup.string().required("Billing is required"),
  });