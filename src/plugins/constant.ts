export const typeList = [
  {
    value: "云计算",
    label: "云计算",
  },
  {
    value: "生物信息学",
    label: "生物信息学",
  },
  {
    value: "石油工业软件",
    label: "石油工业软件",
  },
];

// 性别
export const genderList = [
  {
    value: 0,
    label: "男",
  },
  {
    value: 1,
    label: "女",
  },
];

export const roleList = [
  {
    value: "user",
    label: "普通用户",
  },
  {
    value: "admin",
    label: "管理员",
  },
  {
    value: "ban",
    label: "封禁用户",
  },
];

export const images = [
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp",
];

// 审核状态枚举
export const REVIEW_STATUS_ENUM = {
  // 待审核
  REVIEWING: 0,
  // 通过
  PASS: 1,
  // 拒绝
  REJECT: 2,
};

// 审核状态映射
export const REVIEW_STATUS_MAP = {
  0: "待审核",
  1: "通过",
  2: "拒绝",
};

export const dataset_scroll = {
  x: 1600,
  maxHeight: 1500,
};

export const dataset_columns = [
  {
    title: "ID",
    dataIndex: "id",
    fixed: "left",
    width: 50,
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "作者",
    dataIndex: "author",
    ellipsis: true,
    tooltip: true,
    width: 100,
  },
  {
    title: "数据集链接",
    dataIndex: "link",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "图片",
    dataIndex: "image_url",
    slotName: "image_url",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "类型",
    dataIndex: "type",
    width: 100,
  },
  {
    title: "摘要",
    dataIndex: "abstract",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    slotName: "createTime",
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    slotName: "updateTime",
  },
  {
    title: "操作",
    slotName: "optional",
    fixed: "right",
    width: 180,
  },
];

export const user_scroll = {
  x: 800,
  maxHeight: 1500,
};

export const user_columns = [
  {
    title: "用户ID",
    dataIndex: "id",
    fixed: "left",
    width: 50,
  },
  {
    title: "账号",
    dataIndex: "account",
  },
  {
    title: "用户昵称",
    dataIndex: "name",
  },
  {
    title: "用户头像",
    dataIndex: "avatar",
    slotName: "avatar",
  },
  {
    title: "用户简介",
    dataIndex: "profile",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "用户角色",
    dataIndex: "role",
  },
  {
    title: "审核状态",
    dataIndex: "reviewStatus",
    slotName: "reviewStatus",
  },
  {
    title: "操作",
    slotName: "optional",
    fixed: "right",
    width: 210,
  },
];

export const team_scroll = {
  x: 2500,
  maxHeight: 1500,
};

export const team_columns = [
  {
    title: "成员ID",
    dataIndex: "id",
    fixed: "left",
    width: 50,
  },
  {
    title: "姓名",
    dataIndex: "name",
  },
  {
    title: "性别",
    dataIndex: "gender",
  },
  {
    title: "民族",
    dataIndex: "ethnicity",
  },
  {
    title: "系所",
    dataIndex: "department",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "职务",
    dataIndex: "position",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "职称",
    dataIndex: "title",
  },
  {
    title: "办公电话",
    dataIndex: "phone",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "电子邮箱",
    dataIndex: "email",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "照片",
    dataIndex: "image_url",
    slotName: "image_url",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "个人简介",
    dataIndex: "profile",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "研究领域",
    dataIndex: "areas",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "主讲课程",
    dataIndex: "courses",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "专利",
    dataIndex: "patents",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "科研项目",
    dataIndex: "projects",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "论文",
    dataIndex: "publications",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "荣誉",
    dataIndex: "honors",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "操作",
    slotName: "optional",
    fixed: "right",
    width: 100,
  },
];

export const paper_scroll = {
  x: 1800,
  maxHeight: 1500,
};

export const paper_columns = [
  {
    title: "ID",
    dataIndex: "id",
    fixed: "left",
    width: 50,
  },
  {
    title: "论文标题",
    dataIndex: "title",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "论文正文",
    dataIndex: "content",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "发布时间",
    dataIndex: "publishTime",
    slotName: "publishTime",
  },
  {
    title: "作者",
    dataIndex: "author",
  },
  {
    title: "摘要",
    dataIndex: "abstract",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "关键词",
    dataIndex: "keywords",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "被引用次数",
    dataIndex: "citation_count",
  },
  {
    title: "论文来源",
    dataIndex: "source",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "DOI编号",
    dataIndex: "doi",
    ellipsis: true,
    tooltip: true,
    width: 100,
  },
  {
    title: "PDF文件URL",
    dataIndex: "pdf_url",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    slotName: "createTime",
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    slotName: "updateTime",
  },
  {
    title: "操作",
    slotName: "optional",
    fixed: "right",
    width: 150,
  },
];

export const news_scroll = {
  x: 1500,
  maxHeight: 1500,
};

export const news_columns = [
  {
    title: "ID",
    dataIndex: "id",
    fixed: "left",
    width: 50,
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "作者",
    dataIndex: "author",
  },
  {
    title: "发布时间",
    dataIndex: "publish_time",
    slotName: "publish_time",
  },
  {
    title: "链接",
    dataIndex: "link",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "图片",
    dataIndex: "image_url",
    slotName: "image_url",
    ellipsis: true,
    tooltip: true,
    width: 150,
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    slotName: "createTime",
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    slotName: "updateTime",
  },
  {
    title: "操作",
    slotName: "optional",
    fixed: "right",
    width: 180,
  },
];
