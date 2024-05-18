import axios from "axios";

const AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;
