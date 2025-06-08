import service from "@/plugins/axios";
import {
  AddNewsParams,
  AddNewsResponse,
  DeleteNewsParams,
  DeleteNewsResponse,
  GetNewsItemResponse,
  GetNewsParams,
  GetNewsResponse,
  UpdateNewsParams,
  UpdateNewsResponse,
} from "@/api/types/news";

/**
 * 添加新闻
 * @param params - 添加新闻所需参数
 */
export const addNews = (params: AddNewsParams) => {
  return service.post<AddNewsResponse>("/news/add", params);
};

// 删除新闻
export const deleteNews = (params: DeleteNewsParams) => {
  return service.post<DeleteNewsResponse>("/news/delete", params);
};

// 更新新闻
export const updateNews = (params: UpdateNewsParams) => {
  return service.post<UpdateNewsResponse>("/news/update", params);
};

/**
 * 获取新闻列表
 * @param params - 查询参数
 */
export const getNewsList = (params: GetNewsParams) => {
  return service.post<GetNewsResponse>("/news/list", params);
};

/**
 * 获取单个新闻
 * @param id - 新闻ID
 */
export const getNewsById = (id: number) => {
  return service.get<GetNewsItemResponse>(`/news/detail?id=${id}`);
};
