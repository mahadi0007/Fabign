import Axios from "axios";
import { API2 } from "../Api";

const Category = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return await Axios.get(`${API2}/web/category`, config);
};

const Category2 = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return await Axios.get(`${API2}/web/category2`, config);
};

const CategoryType = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return await Axios.get(`${API2}/web/category/${id}`, config);
};

const LandingPage = {
  Category,
  Category2,
  CategoryType,
};

export default LandingPage;
