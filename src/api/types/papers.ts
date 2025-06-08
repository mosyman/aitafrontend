import { BaseResponse, PagedData } from "@/api/types/base";

/** 添加论文请求参数类型 */
export interface AddPaperParams {
  // id?: number;
  title?: string; // 论文标题（必填）
  content?: string; // 论文正文
  publishTime?: string; // 发布时间
  author?: string; // 作者（必填）
  abstract?: string; // 摘要
  keywords?: string; // 关键词，逗号分隔
  citation_count?: number; // 被引用次数
  source?: string; // 论文来源
  doi?: string; // DOI编号
  pdf_url?: string; // PDF文件URL
  // createTime?: string;
  // updateTime?: string;
}

/** 添加论文响应结果类型 */
export interface AddPaperResult {
  id?: number; // 新增论文ID
}

/** 添加论文响应结果封装 */
export type AddPaperResponse = BaseResponse<AddPaperResult>;

/** 删除论文请求参数类型 */
export interface DeletePaperParams {
  id?: number; // 论文ID（必填）
}

/** 删除论文响应结果封装 */
export type DeletePaperResponse = BaseResponse<void>;

/** 更新论文请求参数类型 */
export interface UpdatePaperParams {
  id?: number; // 论文ID（必填）
  title?: string; // 论文标题
  content?: string; // 论文正文
  publishTime?: string; // 发布时间
  author?: string; // 作者
  abstract?: string; // 摘要
  keywords?: string; // 关键词，逗号分隔
  citation_count?: number; // 被引用次数
  source?: string; // 论文来源
  doi?: string; // DOI编号
  pdf_url?: string; // PDF文件URL
  // createTime?: string;
  // updateTime?: string;
}

/** 更新论文响应结果类型 */
export interface UpdatePaperResult {
  result?: boolean; // 更新结果
}

/** 更新论文响应结果封装 */
export type UpdatePaperResponse = BaseResponse<UpdatePaperResult>;

/** 获取论文列表请求参数类型 */
export interface GetPapersParams {
  pageNum?: number; // 页码，默认1
  pageSize?: number; // 每页数量，默认10
  sort_by?: string; // 排序字段，默认createTime
  order?: string; // 排序方向，默认desc
}

/** 论文项类型 */
export interface PaperItem {
  id?: number; // 论文ID
  title?: string; // 论文标题
  content?: string; // 论文正文
  publishTime?: string; // 发布时间
  author?: string; // 作者
  abstract?: string; // 摘要
  keywords?: string; // 关键词，逗号分隔
  citation_count?: number; // 被引用次数
  source?: string; // 论文来源
  doi?: string; // DOI编号
  pdf_url?: string; // PDF文件URL
  createTime?: string; // 创建时间
  updateTime?: string; // 更新时间
}

/** 获取论文列表响应结果类型 */
export type GetPapersResult = PagedData<PaperItem>;

/** 获取论文列表响应结果封装 */
export type GetPapersResponse = BaseResponse<GetPapersResult>;

/** 获取单个论文响应结果封装 */
export type GetPaperResponse = BaseResponse<PaperItem>;
