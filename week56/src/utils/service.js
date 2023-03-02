import axios from "axios";
// import store from '@/store'
// import { getLocalStorageToken } from '@/utils/auth'
import { useStatusStore } from "@/stores/statusStore.js";
const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_PATH;

// create an axios instance
const service = axios.create({
  baseURL: `${baseUrl}/api/${apiPath}`, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    const statusStore = useStatusStore();
    const { setLoading } = statusStore;
    setLoading(true);
    // do something before request is sent
    // 發送請求前會做的事情
    // 這邊目前想到2件事可以先做：
    // 1. 加入全域的 loading 效果在每次發請求前
    // 2. 將 token 帶入 config.headers.Authorization 裏面

    // if (store.getters['user/token']) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers.Authorization = 'Bearer ' + getLocalStorageToken()
    // }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const statusStore = useStatusStore();
    const { setLoading } = statusStore;
    setLoading(false);

    const res = response.data;
    const status = response.status;

    // if the custom code is not 200, it is judged as an error.
    if (status !== 200) {
      // do something

      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    // do something
    return Promise.reject(error);
  }
);

export default service;
