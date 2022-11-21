import { API } from "../Api";
import Axios from "axios";

const Index = async(id) => {
    const config = {
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json",
        }
    }

    return await Axios.get(`${API}/products/rating/get/?product=${id}&page=1&limit=100`, config)
}

const Store = async(data) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
    }
    return await Axios.post(`${API}/products/rating/add/`, data, config)
}

const Rating = {
    Store,
    Index
}


export default Rating