import Axios from "axios";
import { API } from "../Api";

const Login = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return await Axios.post(`${API}/auth/user/login`, data, config);
};

const Register = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return await Axios.post(`${API}/user/register`, data, config);
};

const Authentication = {
  Login,
  Register,
};

export default Authentication;
