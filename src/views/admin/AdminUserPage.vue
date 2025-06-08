<template>
  <div id="AdminUserPage">
    <div class="header">
      <h2>用户管理</h2>
      <a-button type="primary" @click="doAdd">添加用户</a-button>
    </div>
    <a-divider />
    <a-table
      :columns="user_columns"
      :data="dataList || []"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.pageNum,
        total,
      }"
      :scroll="user_scroll"
      @page-change="onPageChange"
    >
      <template #avatar="{ record }">
        <a-image :src="record.avatar" height="100" />
      </template>
      <template #reviewStatus="{ record }">
        {{ REVIEW_STATUS_MAP[record.reviewStatus] }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button
            v-if="record.reviewStatus !== REVIEW_STATUS_ENUM.PASS"
            status="success"
            @click="doReview(record, REVIEW_STATUS_ENUM.PASS)"
          >
            通过
          </a-button>
          <a-button
            v-if="record.reviewStatus !== REVIEW_STATUS_ENUM.REJECT"
            status="warning"
            @click="doReview(record, REVIEW_STATUS_ENUM.REJECT)"
          >
            拒绝
          </a-button>
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { Message } from "@arco-design/web-vue";
import { deleteUser, getUsers, reviewUser } from "@/api/services/user";
import { GetUsersParams, UserItem } from "@/api/types/user";
import {
  REVIEW_STATUS_ENUM,
  REVIEW_STATUS_MAP,
  user_columns,
  user_scroll,
} from "@/plugins/constant";
import router from "@/router";
const dataList = ref<UserItem[]>([]);
const total = ref(0);
const searchParams = ref<GetUsersParams>({
  pageSize: 10,
  pageNum: 1,
});
const loadData = async () => {
  const res = await getUsers(searchParams.value);
  if (res.data.code === 200) {
    dataList.value = res.data.data.items;
    total.value = res.data.data.total;
  } else {
    Message.error("加载失败" + res.data.message);
  }
};
/**
 * 监听 searchParams 变量，改变时触发数据的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 当分页变化时，改变搜索条件，触发数据加载
 * @param page
 */
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageNum: page,
  };
};

const doReview = async (user: UserItem, reviewStatus: number) => {
  if (!user.id) {
    return;
  }
  const res = await reviewUser({
    id: user.id,
    reviewStatus,
  });
  if (res.data.code === 200) {
    Message.success("审核成功");
    loadData();
  } else {
    Message.error("操作失败, " + res.data.message);
  }
};

const doAdd = () => {
  router.push("/add/user");
};

const doUpdate = (user: UserItem) => {
  router.push({
    path: "/update/user",
    query: {
      id: user.id,
    },
  });
};

const doDelete = async (user: UserItem) => {
  const res = await deleteUser({
    id: user.id,
  });
  if (res.data.code === 200) {
    Message.success("删除成功");
    loadData();
  } else {
    Message.error("操作失败" + res.data.message);
  }
};
</script>

<style scoped>
#AdminUserPage {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
}
</style>
