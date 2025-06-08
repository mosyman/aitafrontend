import { BaseResponse } from "@/api/types/base";

// 模型文件上传响应结果类型
export interface ModelUploadResult {
  cosPath: string;
  path: string;
}

// 更新新闻响应结果封装
export type ModelUploadResponse = BaseResponse<ModelUploadResult>;
