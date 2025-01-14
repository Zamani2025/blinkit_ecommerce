import { toast } from "react-toastify";
import SummaryApi from "../common/Summary";
import Axios from "../config/axios";
import AxiosToastError from "../config/AxiosToastError";

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  if (!image) {
    toast.error("Please select a file");
    return;
  }
  try {
    const response = await Axios({
      ...SummaryApi.upload_image,
      data: formData,
    });
    if (response.data.error) {
      toast.error(response.data.message);
    }
    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    AxiosToastError(error);
  }
};

export default uploadImage;
