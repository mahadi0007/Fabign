import { API2 } from "../Api";
import Axios from "axios";

const Index = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await Axios.get(`${API2}/web/bulkproducts`, config);
};

const GetSingleProduct = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await Axios.get(`${API2}/web/bulkproducts/${id}`, config);
};

const BulkProduct = {
  Index,
  GetSingleProduct,
};

export default BulkProduct;
