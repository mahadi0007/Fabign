import { API } from "../Api";
import Axios from 'axios'


const AllBrand = async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }

    return Axios.get(`${API}/products/brand`, config)
}

const Brands = {
    AllBrand
}

export default Brands