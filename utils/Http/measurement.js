import Axios from "axios";
import { API2 } from "../Api";

const Index = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return await Axios.get(`${API2}/web/measurements/${id}`, config);
};

const ProfileIndex = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(`${API2}/web/profile`, config);
};

const ProfileStore = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.post(`${API2}/web/profile`, data, config);
};

const Measurement = {
  Index,
  ProfileIndex,
  ProfileStore,
};
export default Measurement;
