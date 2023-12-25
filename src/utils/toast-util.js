import { toast } from "sonner";

// sucess toaster
export const SuccessToast = (message) => {
  return toast.success(message, {
    cancel: {
      label: "Cancel",
      onClick: () => {},
    },
    duration: 3000,
  });
};

// error toaster

export const ErrorToast = (message) => {
  return toast.error(message, {
    cancel: {
      label: "Cancel",
      onClick: () => {},
    },
    duration: 3000,
  });
};
