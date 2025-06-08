import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AccessEnum from "@/access/accessEnum";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import UserLayout from "@/layouts/UserLayout.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/",
    name: "首页",
    component: HomeView,
    meta: {
      access: AccessEnum.USER,
    },
  },
  {
    path: "/datasets",
    name: "数据集",
    component: () => import("../views/datasets/DatasetsView.vue"),
    meta: {
      access: AccessEnum.USER,
    },
  },
  {
    path: "/dataset/detail/:id",
    name: "数据集详情页",
    props: true,
    component: () => import("../views/datasets/DatasetDetailPage.vue"),
    meta: {
      hideInMenu: true,
      access: AccessEnum.USER,
    },
  },
  {
    path: "/add/datasets",
    name: "添加数据集",
    component: () => import("../views/add/AddDatasetPage.vue"),
    meta: {
      hideInMenu: true,
      access: AccessEnum.ADMIN,
    },
  },
  {
    path: "/update/datasets",
    name: "修改数据集",
    component: () => import("../views/add/AddDatasetPage.vue"),
    meta: {
      hideInMenu: true,
      access: AccessEnum.ADMIN,
    },
  },
  {
    path: "/news",
    name: "新闻",
    component: () => import("../views/news/NewsView.vue"),
    meta: {
      access: AccessEnum.USER,
    },
  },
  {
    path: "/news/detail/:id",
    name: "新闻详情页",
    props: true,
    component: () => import("../views/news/NewsDetailPage.vue"),
    meta: {
      hideInMenu: true,
      access: AccessEnum.USER,
    },
  },
  {
    path: "/add/news",
    name: "添加新闻",
    component: () => import("../views/add/AddNewsPage.vue"),
    meta: {
      hideInMenu: true,
      access: AccessEnum.ADMIN,
    },
  },
  {
    path: "/update/news",
    name: "修改新闻",
    component: () => import("../views/add/AddNewsPage.vue"),
    meta: {
      hideInMenu: true,
      access: AccessEnum.ADMIN,
    },
  },
  {
    path: "/team",
    name: "科研团队",
    component: () => import("../views/team/TeamView.vue"),
    meta: {
      access: AccessEnum.USER,
    },
  },
  {
    path: "/team/detail/:id",
    name: "团队成员详情页",
    props: true,
    component: () => import("../views/team/TeamDetailPage.vue"),
    meta: {
      access: AccessEnum.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/add/team",
    name: "添加团队成员",
    component: () => import("../views/add/AddTeamPage.vue"),
    meta: {
      hideInMenu: true,
      access: AccessEnum.ADMIN,
    },
  },
  {
    path: "/update/team",
    name: "修改团队成员",
    component: () => import("../views/add/AddTeamPage.vue"),
    meta: {
      hideInMenu: true,
      access: AccessEnum.ADMIN,
    },
  },
  {
    path: "/papers",
    name: "论文",
    component: () => import("../views/papers/PapersView.vue"),
    meta: {
      access: AccessEnum.USER,
    },
  },
  {
    path: "/paper/detail/:id",
    name: "论文详情页",
    props: true,
    component: () => import("../views/papers/PaperDetailPage.vue"),
    meta: {
      access: AccessEnum.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/add/paper",
    name: "添加论文",
    component: () => import("../views/add/AddPaperPage.vue"),
    meta: {
      hideInMenu: true,
      access: AccessEnum.ADMIN,
    },
  },
  {
    path: "/update/paper",
    name: "修改论文",
    component: () => import("../views/add/AddPaperPage.vue"),
    meta: {
      hideInMenu: true,
      access: AccessEnum.ADMIN,
    },
  },
  {
    path: "/models",
    name: "模型平台",
    component: () => import("../views/model/ModelView.vue"),
    meta: {
      access: AccessEnum.USER,
    },
  },
  {
    path: "/model/detail/:id",
    name: "模型详情页",
    props: true,
    component: () => import("../views/model/ModelDetailView.vue"),
    meta: {
      hideInMenu: true,
      access: AccessEnum.USER,
    },
  },
  {
    path: "/add/user",
    name: "添加用户",
    component: () => import("../views/add/AddUserPage.vue"),
    meta: {
      hideInMenu: true,
      access: AccessEnum.ADMIN,
    },
  },
  {
    path: "/update/user",
    name: "修改用户",
    component: () => import("../views/add/AddUserPage.vue"),
    meta: {
      hideInMenu: true,
      access: AccessEnum.ADMIN,
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: () => import("../views/NoAuthView.vue"),
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/admin",
    name: "网站管理",
    children: [
      {
        path: "/admin/user",
        name: "用户管理",
        component: () => import("../views/admin/AdminUserPage.vue"),
      },
      {
        path: "/admin/dataset",
        name: "数据集管理",
        component: () => import("../views/admin/AdminDatasetPage.vue"),
      },
      {
        path: "/admin/news",
        name: "新闻管理",
        component: () => import("../views/admin/AdminNewsPage.vue"),
      },
      {
        path: "/admin/team",
        name: "团队成员管理",
        component: () => import("../views/admin/AdminTeamPage.vue"),
      },
      {
        path: "/admin/paper",
        name: "论文管理",
        component: () => import("../views/admin/AdminPapersPage.vue"),
      },
    ],
    meta: {
      access: AccessEnum.ADMIN,
    },
  },
];
