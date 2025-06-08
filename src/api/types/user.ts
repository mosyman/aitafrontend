// 用户信息类型
import { BaseResponse, PagedData } from "@/api/types/base";

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

/** 审核用户请求参数类型 */
export interface ReviewUserParams {
  id?: number; // 用户ID（必填）
  reviewStatus?: number; // 审核状态：0-待审核，1-通过，2-拒绝
}

/** 审核用户响应结果类型 */
export interface ReviewUserResult {
  result?: boolean; // 审核结果
}

/** 审核用户响应结果封装 */
export type ReviewUserResponse = BaseResponse<ReviewUserResult>;

/** 添加用户请求参数类型 */
export interface AddUserParams {
  id?: number;
  account?: string; // 账号（必填）
  password?: string; // 密码（必填）
  name?: string; // 用户昵称
  avatar?: string; // 用户头像
  profile?: string; // 用户简介
  role?: string; // 用户角色：user/admin/ban
  reviewStatus?: number; // 审核状态：0-待审核，1-通过，2-拒绝
}

/** 添加用户响应结果类型 */
export interface AddUserResult {
  id: number; // 新增用户ID
}

/** 添加用户响应结果封装 */
export type AddUserResponse = BaseResponse<AddUserResult>;

/** 删除用户请求参数类型 */
export interface DeleteUserParams {
  id?: number; // 用户ID（必填）
}

/** 删除用户响应结果封装 */
export type DeleteUserResponse = BaseResponse<void>;

/** 更新用户请求参数类型 */
export interface UpdateUserParams {
  id?: number; // 用户ID（必填）
  account?: string; // 账号
  password?: string; // 密码
  name?: string; // 用户昵称
  avatar?: string; // 用户头像
  profile?: string; // 用户简介
  role?: string; // 用户角色：user/admin/ban
  reviewStatus?: number; // 审核状态：0-待审核，1-通过，2-拒绝
}

/** 更新用户响应结果类型 */
export interface UpdateUserResult {
  result: boolean; // 更新结果
}

/** 更新用户响应结果封装 */
export type UpdateUserResponse = BaseResponse<UpdateUserResult>;

/** 获取用户列表请求参数类型 */
export interface GetUsersParams {
  pageNum?: number; // 页码，默认1
  pageSize?: number; // 每页数量，默认10
  sort_by?: string; // 排序字段，默认id
  order?: string; // 排序方向，默认desc
}

/** 用户项类型 */
export interface UserItem {
  id?: number; // 用户ID
  account?: string; // 账号
  name?: string; // 用户昵称
  avatar?: string; // 用户头像
  profile?: string; // 用户简介
  role?: string; // 用户角色：user/admin/ban
  reviewStatus?: number; // 审核状态：0-待审核，1-通过，2-拒绝
}

/** 获取用户列表响应结果类型 */
export type GetUsersResult = PagedData<UserItem>;

/** 获取用户列表响应结果封装 */
export type GetUsersResponse = BaseResponse<GetUsersResult>;

/** 获取单个用户响应结果封装 */
export type GetUserResponse = BaseResponse<UserItem>;
