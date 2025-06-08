<template>
  <div id="TeamDetailView">
    <a-divider />
    <div class="header">
      <a-space>
        <a-image :src="team?.image_url" height="300" />
        <div class="meta-info">
          <a-descriptions
            style="margin-top: 20px"
            :data="metaList"
            size="large"
            :column="1"
          />
        </div>
      </a-space>
    </div>
    <div class="content">
      <a-list :bordered="false" :data="descriptionList">
        <template #item="{ item }">
          <div class="list-item">
            <div class="item-header">
              {{ item.label }}
            </div>
            <div class="item-desc">
              <MdViewer :value="item.value || ''" />
            </div>
          </div>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps, watchEffect } from "vue";
import { Props } from "@/api/types/base";
import { Message } from "@arco-design/web-vue";
import MdViewer from "@/components/MdViewer.vue";
import { TeamMemberItem } from "@/api/types/teamMembers";
import { getTeamMemberById } from "@/api/services/teamMembers";

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const team = ref<TeamMemberItem>();
const metaList = ref<any[]>([]);
const descriptionList = ref<any[]>([]);
const loadData = async () => {
  const res = await getTeamMemberById(Number(props.id));
  if (res.data.code === 200) {
    team.value = res.data.data;
    // 构造metaList
    metaList.value = [
      { label: "姓名", value: team.value?.name },
      { label: "性别", value: team.value?.gender === 0 ? "男" : "女" },
      { label: "民族", value: team.value?.ethnicity },
      { label: "系所", value: team.value?.department },
      { label: "职务", value: team.value?.position },
      { label: "职称", value: team.value?.title },
      { label: "办公电话", value: team.value?.phone },
      { label: "电子邮箱", value: team.value?.email },
    ];
    descriptionList.value = [
      { label: "个人简介", value: team.value?.profile },
      { label: "研究领域", value: team.value?.areas },
      { label: "主讲课程", value: team.value?.courses },
      { label: "专利", value: team.value?.patents },
      { label: "科研项目", value: team.value?.projects },
      { label: "论文", value: team.value?.publications },
      { label: "荣誉", value: team.value?.honors },
    ];
  } else {
    Message.error("获取团队成员失败, " + res.data.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发数据的重新加载
 */
watchEffect(() => {
  loadData();
});
</script>

<style scoped>
#TeamDetailView {
  margin: 0 auto;
  padding: 50px 100px;
  /* 页面头部样式 */
  .header {
    .title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    /* 元信息（作者、时间等）布局 */
    .meta-info {
      padding-left: 20px;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      gap: 16px;
      color: var(--color-text-2);
      .author {
        margin-left: 4px;
      }
    }
  }
  .content {
    .list-item {
      .item-header {
        background-color: #f3f3f3;
        /* 字体大小，可根据需求调整 */
        font-size: 20px;
        /* 字体加粗 */
        font-weight: bold;
        /* 文字颜色，这里用黑色示例 */
        color: #333;
        display: flex;
        align-items: center;
        padding: 5px 0;
      }
      .item-header::before {
        content: "";
        /* 竖线宽度 */
        width: 3px;
        /* 竖线高度，可调整长短 */
        height: 30px;
        /* 竖线颜色，这里用蓝色示例 */
        background-color: #409eff;
        margin-right: 8px;
      }
      .item-desc {
        padding: 20px 20px;
      }
    }
  }
}
</style>
