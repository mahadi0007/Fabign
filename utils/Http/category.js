import { API } from "../Api";
import Axios from "axios";

const AllCategories = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return Axios.get(`${API}/products/category`, config);
};

const Categories = {
  AllCategories,
};

export default Categories;
