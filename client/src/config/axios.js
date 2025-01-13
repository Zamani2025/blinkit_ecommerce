const BaseURL = "http://localhost:5000";
import axios from "axios";

const Axios = axios.create({
    baseURL: BaseURL,
    withCredentials: true
});



export default Axios;