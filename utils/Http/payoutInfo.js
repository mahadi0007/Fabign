import { API2 } from "../Api";
import Axios from "axios";

const Index = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await Axios.get(`${API2}/web/payout-info`, config);
};

const PayoutInfo = {
  Index,
};

export default PayoutInfo;
