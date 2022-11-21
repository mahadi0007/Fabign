import { API } from "../Api";
import Axios from "axios";

const CreateBulkOrder = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return Axios.post(`${API}/bulkOrder`, data, config);
};

// const UpdateOrder = async (data) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   };

//   return Axios.put(
//     `${API}/order/${localStorage.getItem("orderId")}`,
//     data,
//     config
//   );
// };

// const PlaceBkashPayment = async (data) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   };

//   return Axios.post(`${API}/order/bkashPaymentPlace`, data, config);
// };

// const ExecuteBkashPayment = async (data) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   };

//   return Axios.post(`${API}/order/bkashPaymentExecute`, data, config);
// };

const BulkOrder = {
  CreateBulkOrder,
  // UpdateOrder,
  // PlaceBkashPayment,
  // ExecuteBkashPayment,
};

export default BulkOrder;
