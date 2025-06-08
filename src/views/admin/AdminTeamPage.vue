<template>
  <div id="AdminTeamPage">
    <div class="header">
      <h2>团队成员管理</h2>
      <a-button type="primary" @click="doAdd">添加团队成员</a-button>
    </div>
    <a-divider />
    <a-table
      :columns="team_columns"
      :data="dataList || []"
      :scroll="team_scroll"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.pageNum,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #image_url="{ record }">
        <a-image :src="record.image_url" height="100" />
      </template>
      <template #optional="{ record }">
        <a-space>
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
import { team_columns, team_scroll } from "@/plugins/constant";
import { deleteTeamMember, getTeamMembers } from "@/api/services/teamMembers";
import { GetTeamMembersParams, TeamMemberItem } from "@/api/types/teamMembers";
import router from "@/router";
const dataList = ref<TeamMemberItem[]>([]);
const total = ref(0);
const searchParams = ref<GetTeamMembersParams>({
  pageSize: 6,
  pageNum: 1,
});

const loadData = async () => {
  const res = await getTeamMembers(searchParams.value);
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

const doAdd = () => {
  router.push("/add/team");
};

const doUpdate = (user: TeamMemberItem) => {
  router.push({
    path: "/update/team",
    query: {
      id: user.id,
    },
  });
};

const doDelete = async (user: TeamMemberItem) => {
  const res = await deleteTeamMember({
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
#AdminTeamPage {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
}
</style>
