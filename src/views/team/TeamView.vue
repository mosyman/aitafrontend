<template>
  <div id="Team">
    <a-list
      class="list"
      :grid-props="{ gutter: [24, 24], span: 8 }"
      :bordered="false"
      :data="dataList"
      :pagination-props="{
        showTotal: true,
        total: total,
        current: searchParams.pageNum,
        pageSize: searchParams.pageSize,
      }"
      @page-change="onPageChange"
    >
      <template #item="{ item }">
        <div class="list-item" @click="doClick(item)">
          <a-image
            height="250px"
            :src="item.image_url"
            :title="item.name"
            :description="item.title"
            footerPosition="outer"
          />
        </div>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { Message } from "@arco-design/web-vue";
import { getTeamMembers } from "@/api/services/teamMembers";
import { GetTeamMembersParams, TeamMemberItem } from "@/api/types/teamMembers";
import { useRouter } from "vue-router";
const router = useRouter();
const dataList = ref<TeamMemberItem[]>([]);
const total = ref(0);
const searchParams = ref<GetTeamMembersParams>({
  pageSize: 10,
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

const doClick = (item: TeamMemberItem) => {
  router.push(`/team/detail/${item.id}`);
};
</script>

<style scoped>
#Team {
  margin: 30px auto;
  padding: 20px 100px;
  .list .list-item {
    padding: 20px 0;
    margin: 10px 10px;
  }
}
</style>
