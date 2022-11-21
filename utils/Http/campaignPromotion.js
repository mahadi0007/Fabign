import { API } from "../Api";
import Axios from "axios";

const Index = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.get(
    `${API}/user/dashboard/store/campaign/promotion/getall/?page=1&limit=100`,
    config
  );
};

const Store = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.post(
    `${API}/user/dashboard/store/campaign/promotion/add/`,
    data,
    config
  );
};

const CampaignPromotion = {
  Store,
  Index,
};

export default CampaignPromotion;
