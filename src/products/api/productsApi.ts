import axios from "axios";

const productsApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export { productsApi };
