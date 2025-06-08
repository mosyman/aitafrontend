import {
  AddPaperParams,
  AddPaperResponse,
  DeletePaperParams,
  DeletePaperResponse,
  GetPaperResponse,
  GetPapersParams,
  GetPapersResponse,
  UpdatePaperParams,
  UpdatePaperResponse,
} from "@/api/types/papers";
import service from "@/plugins/axios";

/**
 * 添加论文
 * @param params - 添加论文所需参数
 */
export const addPaper = (params: AddPaperParams) => {
  return service.post<AddPaperResponse>("/papers/add", params);
};

/**
 * 删除论文
 * @param params - 删除论文所需参数
 */
export const deletePaper = (params: DeletePaperParams) => {
  return service.post<DeletePaperResponse>("/papers/delete", params);
};

/**
 * 更新论文
 * @param params - 更新论文所需参数
 */
export const updatePaper = (params: UpdatePaperParams) => {
  return service.post<UpdatePaperResponse>("/papers/update", params);
};

/**
 * 获取论文列表
 * @param params - 查询参数
 */
export const getPapers = (params: GetPapersParams) => {
  return service.post<GetPapersResponse>("/papers/list", params);
};

/**
 * 获取单个论文
 * @param id - 论文ID
 */
export const getPaperById = (id: number) => {
  return service.get<GetPaperResponse>(`/papers/detail?id=${id}`);
};
