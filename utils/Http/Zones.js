import { API } from "../Api";
import Axios from "axios";

// List of zones
const AllZones = async () => {
    const header = {
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    }

    return await Axios.get(`${API}/delivery/charge/zones`, header)
}


// List of zones
const ShippingIndex = async (data) => {
    const header = {
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    }

    return await Axios.get(`${API}/delivery/charge/calculate?origin=cft&zone=${data}`, header)
}

const Zone = {
    AllZones,
    ShippingIndex
}


export default Zone