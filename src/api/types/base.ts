// 通用响应类型
export interface BaseResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 定义分页数据接口
export interface PagedData<T> {
  items: T[]; // 数据集列表
  total: number; // 总数量
  pages: number; // 总页数
  pageNum: number; // 当前页码
  pageSize: number; // 每页数量
}
