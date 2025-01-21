import axios from "axios";

const backend = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

export default backend;
