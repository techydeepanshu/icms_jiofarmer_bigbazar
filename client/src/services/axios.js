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

const WordpressAxios = axios.create({
    baseURL: "https://badshahgroceries.com//wp-json/wc/v2",
    auth: {
      username: "ck_4dcf7a5c2cdaef1a29b125570ca3e38385bf6e9a",
      password: "cs_e8170ba63b39ba5c0903769941492eed3fb1ee8a"
    }
});


export  {WordpressAxios};