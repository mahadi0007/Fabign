import { API } from "../Api";
import Axios from "axios";

const FindPromoCode = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.post(`${API}/promoCode/findPromoCode`, data, config);
};

const PromoCode = {
  FindPromoCode,
};

export default PromoCode;
