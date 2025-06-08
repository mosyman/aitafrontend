import { BaseResponse, PagedData } from "@/api/types/base";

/** 添加新闻请求参数类型 */
export interface AddNewsParams {
  // id?: number;
  title?: string; // 标题（必填）
  content?: string; // 内容（必填）
  author?: string; // 作者
  link?: string; // 链接
  image_url?: string; // 图片URL
  publish_time?: string; // 发布时间
  // createTime?: string;
  // updateTime?: string;
}

/** 添加新闻响应结果类型 */
export interface AddNewsResult {
  id?: number; // 新增新闻ID
}

export type AddNewsResponse = BaseResponse<AddNewsResult>;

// 删除新闻请求参数类型
export interface DeleteNewsParams {
  id?: number; // 新闻ID（必填）
}

// 删除新闻响应结果封装
export type DeleteNewsResponse = BaseResponse<void>;

// 更新新闻请求参数类型
export interface UpdateNewsParams {
  id?: number; // 新闻ID（必填）
  title?: string; // 标题
  content?: string; // 内容
  author?: string; // 作者
  link?: string; // 链接
  image_url?: string; // 图片URL
  publish_time?: string; // 发布时间
  // createTime?: string;
  // updateTime?: string;
}

// 更新新闻响应结果类型
export interface UpdateNewsResult {
  result?: boolean; // 更新结果
}

// 更新新闻响应结果封装
export type UpdateNewsResponse = BaseResponse<UpdateNewsResult>;

/** 获取新闻列表请求参数类型 */
export interface GetNewsParams {
  pageNum?: number; // 页码，默认1
  pageSize?: number; // 每页数量，默认10
  sort_by?: string; // 排序字段，默认publish_time
  order?: string; // 排序方向，默认desc
}

/** 新闻项类型 */
export interface NewsItem {
  id?: number; // 新闻ID
  title?: string; // 标题
  content?: string; // 内容
  author?: string; // 作者
  publish_time?: string; // 发布时间
  link?: string; // 链接
  image_url?: string; // 图片URL
  createTime?: string; // 创建时间
  updateTime?: string; // 更新时间
}

/** 获取新闻列表响应结果类型 */
export type GetNewsResult = PagedData<NewsItem>;

/** 获取新闻列表响应结果封装 */
export type GetNewsResponse = BaseResponse<GetNewsResult>;

/** 获取单个新闻响应结果封装 */
export type GetNewsItemResponse = BaseResponse<NewsItem>;
