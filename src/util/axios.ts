import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { Message } from "element-ui";
import router from "@/router";

let config = {
  timeout: 10000 //超时
  // baseURL: "https://vuets-api.herokuapp.com",
};

// 创建axios实例
const _axios = axios.create(config);

//请求拦截
_axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (localStorage.spmsToken) {
      config.headers.Authorization = localStorage.spmsToken;
    }
    return config;
  },
  (err: any) => {
    console.log("err:" + err);
    return Promise.reject(err);
  }
);

// 响应拦截
_axios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status != 200) {
      return Promise.reject("error");
    } else {
      return response.data;
    }
  },
  (err: any) => {
    // console.log(err, err.response.status);
    let status = err.response.status;
    if (err && status) {
      let errMsg: any = {
        400: "请求出错",
        401: "登录失效，请重新登录",
        403: "拒绝访问",
        408: "请求超时",
        500: "服务器内部错误",
        501: "服务未实现",
        502: "网关错误",
        503: "服务不可用",
        504: "网关超时",
        505: "http版本不受支持"
      };
      // console.log(errMsg, err.response.status);
      // console.log("err:" + );
      Message.error(errMsg[status]);
      // if (status == 401) {
      //   setTimeout(() => {
      //     localStorage.removeItem("spmsToken");
      //     router.push("./login");
      //   }, 2000);
      // }
    }

    return Promise.reject(err);
  }
);

export default _axios;
