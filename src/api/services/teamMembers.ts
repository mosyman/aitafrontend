import {
  AddTeamMemberParams,
  AddTeamMemberResponse,
  DeleteTeamMemberParams,
  DeleteTeamMemberResponse,
  GetTeamMemberResponse,
  GetTeamMembersParams,
  GetTeamMembersResponse,
  UpdateTeamMemberParams,
  UpdateTeamMemberResponse,
} from "@/api/types/teamMembers";
import service from "@/plugins/axios";

/**
 * 添加团队成员
 * @param params - 添加团队成员所需参数
 */
export const addTeamMember = (params: AddTeamMemberParams) => {
  return service.post<AddTeamMemberResponse>("/team/add", params);
};

/**
 * 删除团队成员（逻辑删除）
 * @param params - 删除团队成员所需参数
 */
export const deleteTeamMember = (params: DeleteTeamMemberParams) => {
  return service.post<DeleteTeamMemberResponse>("/team/delete", params);
};

/**
 * 更新团队成员信息
 * @param params - 更新团队成员所需参数
 */
export const updateTeamMember = (params: UpdateTeamMemberParams) => {
  return service.post<UpdateTeamMemberResponse>("/team/update", params);
};

/**
 * 获取团队成员列表
 * @param params - 查询参数
 */
export const getTeamMembers = (params: GetTeamMembersParams) => {
  return service.post<GetTeamMembersResponse>("/team/list", params);
};

/**
 * 获取单个团队成员详情
 * @param id - 团队成员ID
 */
export const getTeamMemberById = (id: number) => {
  return service.get<GetTeamMemberResponse>(`/team/detail?id=${id}`);
};
