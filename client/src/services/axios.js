import axios from "axios";
const Axios = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use(async function (config) {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  config.headers["user-key"] = userId;
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default Axios;

const WordpressAxios = axios.create({
  baseURL: "https://maharajafarmersmarketusa.com/wp-json/wc/v2",
  auth: {
    username: "ck_cd683dbf821efdb611473ba8213e9a1680df1c08",
    password: "cs_33e2223596248d67eb8b9fb66973cf8689e4bfd8",
  },
});

export { WordpressAxios };

const POSAxios = axios.create({
  // baseURL: "https://dataservices.sypramsoftware.com/api",
  auth: {
    username: "MeCHHkZ9",
    password: "tdypsA=",
  },
  headers: {
    Pin: "lqBZghxJgaVE",
    UserId: "MeCHHkZ9",
    Password: "tdypsA =",
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
});

export { POSAxios };
