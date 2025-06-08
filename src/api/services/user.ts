import service from "@/plugins/axios";
import {
  AddUserParams,
  AddUserResponse,
  AuthParams,
  CurrentUserResponse,
  DeleteUserParams,
  DeleteUserResponse,
  GetUserResponse,
  GetUsersParams,
  GetUsersResponse,
  LoginResponse,
  RegisterResponse,
  ReviewUserParams,
  ReviewUserResponse,
  UpdateUserParams,
  UpdateUserResponse,
} from "@/api/types/user";
import { BaseResponse } from "@/api/types/base";

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
  return service.get<BaseResponse<void>>("/user/logout");
};

/**
 * 审核用户
 * @param params - 审核用户所需参数
 */
export const reviewUser = (params: ReviewUserParams) => {
  return service.post<ReviewUserResponse>("/users/review", params);
};

/**
 * 添加用户
 * @param params - 添加用户所需参数
 */
export const addUser = (params: AddUserParams) => {
  return service.post<AddUserResponse>("/users/add", params);
};

// 删除用户
export const deleteUser = (params: DeleteUserParams) => {
  return service.post<DeleteUserResponse>("/users/delete", params);
};

// 更新用户
export const updateUser = (params: UpdateUserParams) => {
  return service.post<UpdateUserResponse>("/users/update", params);
};

/**
 * 获取用户列表
 * @param params - 查询参数
 */
export const getUsers = (params: GetUsersParams) => {
  return service.post<GetUsersResponse>("/users/list", params);
};

/**
 * 获取单个用户
 * @param id - 用户ID
 */
export const getUserById = (id: number) => {
  return service.get<GetUserResponse>(`/users/detail?id=${id}`);
};
