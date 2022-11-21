import { API } from "../Api";
import Axios from 'axios'


const ProductWiseAdditionalInfo = async (id) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application.json"
        }
    }

    return await Axios.get(`${API}/products/additionalinfo/getProductWise/${id}`, config)
}


const AdditionalInfo = {
    ProductWiseAdditionalInfo
}

export default AdditionalInfo;