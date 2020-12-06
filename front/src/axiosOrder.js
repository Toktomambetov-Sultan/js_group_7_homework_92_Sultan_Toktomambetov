import axios from "axios";
import config from "./config";

const axiosOrder = axios.create({
  baseURL: config.BaseUrl,
});

export default axiosOrder;
