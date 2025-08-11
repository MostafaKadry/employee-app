import toast from "react-hot-toast";
const ToastArrayOfErrors = (errors, message) => {
  if (errors instanceof Array && errors.length > 0) {
    return errors.forEach((error) => {
      if (error.message && typeof error.message === "string") {
        toast.error(error.message);
      }
    });
  } else {
    toast.error(message);
    return null;
  }
};

export default ToastArrayOfErrors;
