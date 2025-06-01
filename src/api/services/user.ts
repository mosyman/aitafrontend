import service from "@/plugins/axios";
import {
  AuthParams,
  CurrentUserResponse,
  LoginResponse,
  RegisterResponse,
} from "@/api/types/user";

// 注册接口
export const register = (params: AuthParams) => {
  return service.post<RegisterResponse>("/user/register", {
    account: params.account,
    password: params.password,
    check_password: params.check_password, // 注册时需要确认密码
  });
};

// 登录接口
export const login = (params: AuthParams) => {
  return service.post<LoginResponse>("/user/login", {
    account: params.account,
    password: params.password,
  });
};

// 获取当前用户接口
export const getCurrentUser = () => {
  return service.get<CurrentUserResponse>("/user/current");
};

// 注销接口
export const logout = () => {
  return service.post("/user/logout");
};
