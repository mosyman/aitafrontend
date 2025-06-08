import { BaseResponse, PagedData } from "@/api/types/base";

/** 添加团队成员请求参数类型 */
export interface AddTeamMemberParams {
  // id?: number;
  name?: string; // 姓名（必填）
  gender?: number; // 性别0-男 1-女
  ethnicity?: string; // 民族
  department?: string; // 系所
  position?: string; // 职务
  title?: string; // 职称
  phone?: string; // 办公电话
  email?: string; // 电子邮箱（必填）
  image_url?: string; // 照片
  profile?: string; // 个人简介
  areas?: string; // 研究领域
  courses?: string; // 主讲课程
  patents?: string; // 专利
  projects?: string; // 科研项目
  publications?: string; // 论文
  honors?: string; // 荣誉
}

/** 添加团队成员响应结果类型 */
export interface AddTeamMemberResult {
  id?: number; // 新增团队成员ID
}

/** 添加团队成员响应结果封装 */
export type AddTeamMemberResponse = BaseResponse<AddTeamMemberResult>;

/** 删除团队成员请求参数类型 */
export interface DeleteTeamMemberParams {
  id?: number; // 团队成员ID（必填）
}

/** 删除团队成员响应结果封装 */
export type DeleteTeamMemberResponse = BaseResponse<void>;

/** 更新团队成员请求参数类型 */
export interface UpdateTeamMemberParams {
  id?: number; // 团队成员ID（必填）
  name?: string; // 姓名
  gender?: number; // 性别0-男 1-女
  ethnicity?: string; // 民族
  department?: string; // 系所
  position?: string; // 职务
  title?: string; // 职称
  phone?: string; // 办公电话
  email?: string; // 电子邮箱
  image_url?: string; // 照片
  profile?: string; // 个人简介
  areas?: string; // 研究领域
  courses?: string; // 主讲课程
  patents?: string; // 专利
  projects?: string; // 科研项目
  publications?: string; // 论文
  honors?: string; // 荣誉
}

/** 更新团队成员响应结果类型 */
export interface UpdateTeamMemberResult {
  result?: boolean; // 更新结果
}

/** 更新团队成员响应结果封装 */
export type UpdateTeamMemberResponse = BaseResponse<UpdateTeamMemberResult>;

/** 获取团队成员列表请求参数类型 */
export interface GetTeamMembersParams {
  pageNum?: number; // 页码，默认1
  pageSize?: number; // 每页数量，默认10
  sort_by?: string; // 排序字段，默认id
  order?: string; // 排序方向，默认desc
}

/** 团队成员项类型 */
export interface TeamMemberItem {
  id?: number; // 团队成员ID
  name?: string; // 姓名
  gender?: number; // 性别0-男 1-女
  ethnicity?: string; // 民族
  department?: string; // 系所
  position?: string; // 职务
  title?: string; // 职称
  phone?: string; // 办公电话
  email?: string; // 电子邮箱
  image_url?: string; // 照片
  profile?: string; // 个人简介
  areas?: string; // 研究领域
  courses?: string; // 主讲课程
  patents?: string; // 专利
  projects?: string; // 科研项目
  publications?: string; // 论文
  honors?: string; // 荣誉
}

/** 获取团队成员列表响应结果类型 */
export type GetTeamMembersResult = PagedData<TeamMemberItem>;

/** 获取团队成员列表响应结果封装 */
export type GetTeamMembersResponse = BaseResponse<GetTeamMembersResult>;

/** 获取单个团队成员响应结果封装 */
export type GetTeamMemberResponse = BaseResponse<TeamMemberItem>;
