import { API, API2 } from "../Api";
import Axios from "axios";

const CreateCampaign = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return Axios.post(
    `${API}/user/dashboard/store/campaign/create`,
    data,
    config
  );
};

const GetSingleCampaign = async (url) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return Axios.get(
    `${API}/user/dashboard/store/campaign/single/${url}`,
    config
  );
};

const GetAllCampaignOfUser = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return Axios.get(`${API}/user/dashboard/store/campaign/get/all`, config);
};

const GetAllCampaign = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return Axios.get(`${API2}/web/campaigns`, config);
};

// filter campaign
const FilterCampaign = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return Axios.post(`${API2}/web/campaigns/filter`, data, config);
};

const CountCampaign = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return Axios.get(
    `${API}/user/dashboard/store/campaign/stat/count-user-all-status-campaign`,
    config
  );
};

const Campaign = {
  CreateCampaign,
  GetSingleCampaign,
  GetAllCampaign,
  GetAllCampaignOfUser,
  FilterCampaign,
  CountCampaign,
};

export default Campaign;
