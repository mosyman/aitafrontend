import axios from "axios";

// 创建 Axios 实例
const service = axios.create({
  baseURL: "http://localhost:5000/api", // 后端接口基础路径
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
