import SummaryApi from "../common/Summary";
import Axios from "../config/axios";


const fetchUserDetails = async () => {
    try {
        const response = await Axios({
            ...SummaryApi.fetch_user,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        
    }
}

export default fetchUserDetails