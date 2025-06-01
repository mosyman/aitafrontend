// 用户信息类型
import { BaseResponse } from "@/api/types/base";

export interface UserInfo {
  account?: string;
  name?: string;
  avatar?: string;
  profile?: string;
  role?: string;
}

// 注册/登录请求参数类型
export type AuthParams = {
  account: string;
  password: string;
  check_password?: string; // 注册时必填
};

// 登录响应类型
export type LoginResponse = BaseResponse<UserInfo>;

// 注册响应类型
export type RegisterResponse = BaseResponse<{ userId: number }>;

// 当前登录用户响应类型
export type CurrentUserResponse = BaseResponse<UserInfo>;
