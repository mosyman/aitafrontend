<template>
  <div id="globalHeader">
    <a-row align="center" :wrap="false">
      <a-col flex="200px">
        <router-link to="/">
          <div class="title-bar">
            <img src="@/assets/logo.png" alt="" class="logo" />
          </div>
        </router-link>
      </a-col>
      <a-col flex="auto">
        <a-menu
          mode="horizontal"
          :selected-keys="selectedKeys"
          @menu-item-click="doMenuClick"
        >
          <!-- 使用 v-for 渲染菜单项和子菜单 -->
          <template v-for="item in visibleRoutes">
            <!-- 有子路由的菜单项使用 a-sub-menu -->
            <a-sub-menu
              v-if="item.children && item.children.length > 0"
              :key="item.path + '-sub'"
            >
              <template #title>
                {{ item.name }}
              </template>
              <a-menu-item
                v-for="child in item.children"
                :key="child.path"
                :disabled="child.meta?.disabled"
              >
                {{ child.name }}
              </a-menu-item>
            </a-sub-menu>

            <!-- 无子路由的菜单项直接使用 a-menu-item -->
            <a-menu-item
              v-else
              :key="item.path"
              :disabled="item.meta?.disabled"
            >
              {{ item.name }}
            </a-menu-item>
          </template>
        </a-menu>
      </a-col>
      <a-col flex="120px">
        <div class="user-login-status">
          <div v-if="store.state.user?.loginUser.account">
            <a-dropdown>
              <a-space>
                <a-avatar
                  :image-url="store.state.user?.loginUser?.avatar"
                  :size="30"
                />
                {{ store.state.user?.loginUser?.name ?? "无名" }}
              </a-space>
              <template #content>
                <a-menu @click="doLogOut">
                  <a-space>
                    <a-menu-item> <icon-unlock />退出登录 </a-menu-item>
                  </a-space>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <div v-else>
            <a-button type="primary" href="/user/login">登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import { logout } from "@/api/services/user";
import { Message } from "@arco-design/web-vue";
const store = useStore();
const router = useRouter();
//展示在菜单的路由数组
//展示在菜单的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    //根据权限过滤菜单
    if (!checkAccess(store.state.user.loginUser, item.meta?.access as string)) {
      return false;
    }
    return true;
  });
});
//默认主页
const selectedKeys = ref(["/"]);
//路由跳转后，更新激活项
router.afterEach((to, from, next) => {
  selectedKeys.value = [to.path];
});
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

const doLogOut = async () => {
  const res = await logout();
  if (res.data.code === 200) {
    await store.dispatch("clearLoginUser");
    Message.success(res.data.message);
    await router.push("/user/login");
  } else {
    Message.error("退出登录失败");
  }
};
</script>

<style scoped>
#globalHeader {
  .title-bar {
    display: flex;
    align-items: center;
    .logo {
      height: 48px;
    }
  }
  .user-login-status {
    background-color: #ffffff;
  }
}
</style>
