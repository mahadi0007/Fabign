import { API } from "../Api";
import Axios from 'axios'


const ProductWiseFaq = async(id) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application.json"
        }
    }

    return await Axios.get(`${API}/products/faq/getProductWise/${id}`, config)
}


const FAQ = {
    ProductWiseFaq
}

export default FAQ;