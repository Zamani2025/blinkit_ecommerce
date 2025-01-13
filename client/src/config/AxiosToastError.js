import { toast } from "react-toastify";

const AxiosToastError = (error) => {
  if (error?.response) {
    toast.error(error?.response?.data?.message);
  }
};

export default AxiosToastError;
