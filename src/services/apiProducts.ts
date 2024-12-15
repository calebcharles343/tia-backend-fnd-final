import axios from "axios";
import generalApiHeader from "../utils/generalapiHeader";

const headers = generalApiHeader();
const url = "https://tia-backend-final.onrender.com/api/v1/e-commerce";

export const getAllProducts = async () => {
  const response = await axios.get(`${url}/products`, {
    headers,
  });

  return response.data;
};
