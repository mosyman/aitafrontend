import { BaseResponse, PagedData } from "@/api/types/base";

/** 添加数据集请求参数类型 */
export interface AddDatasetParams {
  id?: number; // 冗余
  title?: string; // 标题（必填）
  content?: string; // 内容（必填）
  author?: string; // 作者
  link?: string; // 链接
  image_url?: string; // 图片URL
  type?: string; // 类型（必填）
  abstract?: string; // 摘要
  createTime?: string; // 冗余
  updateTime?: string; // 冗余
}
/** 添加数据集响应结果类型 */
export interface AddDatasetResult {
  id?: number; // 新增数据集ID
}
export type AddDatasetResponse = BaseResponse<AddDatasetResult>;

// 删除数据集请求参数类型
export interface DeleteDatasetParams {
  id?: number; // 数据集ID（必填）
}

// 删除数据集响应结果封装
export type DeleteDatasetResponse = BaseResponse<void>;

// 更新数据集请求参数类型
export interface UpdateDatasetParams {
  id?: number; // 数据集ID（必填）
  title?: string; // 标题
  content?: string; // 内容
  author?: string; // 作者
  link?: string; // 链接
  image_url?: string; // 图片URL
  type?: string; // 类型
  abstract?: string; // 摘要
}

// 更新数据集响应结果类型
export interface UpdateDatasetResult {
  result?: boolean; // 更新结果
}

// 更新数据集响应结果封装
export type UpdateDatasetResponse = BaseResponse<UpdateDatasetResult>;

/** 获取数据集列表请求参数类型 */
export interface GetDatasetsParams {
  pageNum?: number; // 页码，默认1
  pageSize?: number; // 每页数量，默认10
  sort_by?: string; // 排序字段，默认createTime
  order?: string; // 排序方向，默认desc
}

/** 数据集项类型 */
export interface DatasetItem {
  id?: number; // 数据集ID
  title?: string; // 标题
  content?: string; // 内容
  author?: string; // 作者
  link?: string; // 链接
  image_url?: string; // 图片URL
  type?: string; // 类型
  abstract?: string; // 摘要
  createTime?: string; // 创建时间
  updateTime?: string; // 更新时间
}

/** 获取数据集列表响应结果类型 */
export type GetDatasetsResult = PagedData<DatasetItem>;

/** 获取数据集列表响应结果封装 */
export type GetDatasetsResponse = BaseResponse<GetDatasetsResult>;

/** 获取单个数据集响应结果封装 */
export type GetDatasetResponse = BaseResponse<DatasetItem>;
