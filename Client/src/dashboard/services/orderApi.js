import axios from "axios";
const API = "http://localhost:5000/api/orders";

export const getOrders = async () => {
    const res = await axios.get(API);
    return res.data;
};
