import axios from "axios";

// 区分开发和生产环境
const DEV_BASE_URL = "http://localhost:5002/api";
const PROD_BASE_URL = "http://49.232.73.108/api";

// 创建 Axios 实例
const service = axios.create({
  baseURL: PROD_BASE_URL, // 后端接口基础路径
  // timeout: 10000, // 超时时间
  withCredentials: true, // 允许携带 Cookie
});

// 请求拦截器
service.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截器：统一处理错误信息
service.interceptors.response.use(
  function (response) {
    // console.log("响应", response);
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default service;
