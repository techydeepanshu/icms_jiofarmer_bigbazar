import axios from "axios";
const Axios = axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
});

Axios.interceptors.request.use(async function (config) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    config.headers["user-key"] = userId ;
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});

export default Axios;
