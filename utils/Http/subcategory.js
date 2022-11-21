import { API } from "../Api";
import Axios from "axios";

const AllSubCategories = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return Axios.get(`${API}/products/subcategory`, config);
};

const SubCategories = {
  AllSubCategories,
};

export default SubCategories;
