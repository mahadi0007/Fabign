import { API } from "../Api";
import Axios from "axios";

const FindCoupon = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.post(`${API}/coupon/findCoupon`, data, config);
};

const Coupon = {
  FindCoupon,
};

export default Coupon;
