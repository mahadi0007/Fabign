import { API } from "../Api";
import Axios from 'axios'

// all products
const AllProducts = async (page) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }

    return Axios.get(`${API}/products/v2/get-all?page=${page}`, config)
}


// category wise 
const CategoryWiseProduct = async(id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }
    return Axios.get(`${API}/products/v2/cat/${id}`, config)
}

// searh
const Search = async(data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }
    return Axios.post(`${API}/products/v2/search/`, data,config)
}


// get single product
const SingleProduct = async (id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }
    return Axios.get(`${API}/products/v2/single/${id}`, config)
}

// filter product
const FilterProduct = async(data) => {
    const config = {
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        }
    }
    return Axios.post(`${API}/products/v2/filter/`, data, config)
}

// variations
const ProductVariations = async(page, limit) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json'
        }
    }

    return Axios.get(`${API}/products/variation?page=${page}&limit=${limit}`, config)
}

const Products = {
    AllProducts,
    CategoryWiseProduct,
    Search,
    SingleProduct,
    FilterProduct,
    ProductVariations
}

export default Products