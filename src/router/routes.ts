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
  },
  {
    path: "/datasets",
    name: "数据集",
    component: () => import("../views/datasets/DatasetsView.vue"),
  },
  {
    path: "/add/datasets",
    name: "添加数据集",
    component: () => import("../views/datasets/AddDatasetView.vue"),
    // meta: {
    //   hideInMenu: true,
    //   access: AccessEnum.ADMIN,
    // },
  },
  {
    path: "/manage/datasets",
    name: "数据集管理",
    component: () => import("../views/datasets/ManageDatasetView.vue"),
    // meta: {
    //   hideInMenu: true,
    //   access: AccessEnum.ADMIN,
    // },
  },
  {
    path: "/group",
    name: "团队风采",
    component: () => import("../views/GroupView.vue"),
  },
  {
    path: "/model",
    name: "模型平台",
    component: () => import("../views/ModelView.vue"),
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
    component: () => import("../views/AdminView.vue"),
    meta: {
      access: AccessEnum.ADMIN,
    },
  },
];
