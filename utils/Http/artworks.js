import { API2 } from "../Api";
import Axios from "axios";

const pixabayAPI = "https://pixabay.com/api/?key=26989130-08a64865604ee2a22958b6c98";

const SearchPixabay = async (query) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    return await Axios.get(`${pixabayAPI}&q=${query}&image_type=photo&pretty=true`, config)
}

const SearchFromEFG = async() => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    return await Axios.get(`${API2}/web/odpartwork`, config)
}

const ArtWork = {
    SearchPixabay,
    SearchFromEFG
}

export default ArtWork