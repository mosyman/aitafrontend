import service from "@/plugins/axios";
import {
  AddDatasetParams,
  AddDatasetResponse,
  DeleteDatasetParams,
  DeleteDatasetResponse,
  GetDatasetsParams,
  UpdateDatasetParams,
  UpdateDatasetResponse,
  GetDatasetsResponse,
  GetDatasetResponse,
} from "@/api/types/datasets";
/**
 * 添加数据集
 * @param params - 添加数据集所需参数
 */
export const addDataset = (params: AddDatasetParams) => {
  return service.post<AddDatasetResponse>("/datasets/add", params);
};

// 删除数据集
export const deleteDataset = (params: DeleteDatasetParams) => {
  return service.post<DeleteDatasetResponse>("/datasets/delete", params);
};

// 更新数据集
export const updateDataset = (params: UpdateDatasetParams) => {
  return service.post<UpdateDatasetResponse>("/datasets/update", params);
};

/**
 * 获取数据集列表
 * @param params - 查询参数
 */
export const getDatasets = (params: GetDatasetsParams) => {
  return service.post<GetDatasetsResponse>("/datasets/list", params);
};

/**
 * 获取单个数据集
 * @param id - 数据集ID
 */
export const getDataset = (id: number) => {
  return service.get<GetDatasetResponse>(`/datasets/detail?id=${id}`);
};
