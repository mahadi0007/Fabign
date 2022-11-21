import { API } from "../Api";
import Axios from "axios";

const Index = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return await Axios.get(
    `${API}/user/dashboard/store/campaign/ratings/get/?campaign=${id}&page=1&limit=100`,
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
    `${API}/user/dashboard/store/campaign/ratings/add/`,
    data,
    config
  );
};

const CampaignRating = {
  Store,
  Index,
};

export default CampaignRating;
