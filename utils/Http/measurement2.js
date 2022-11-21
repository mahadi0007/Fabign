import Axios from "axios";
import { API2 } from "../Api";

const Index = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return await Axios.get(`${API2}/web/measurements2/${id}`, config);
};

const ProfileIndex = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(`${API2}/web/profile2`, config);
};

const ProfileStore = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.post(`${API2}/web/profile2`, data, config);
};

const Measurement2 = {
  Index,
  ProfileIndex,
  ProfileStore,
};
export default Measurement2;
