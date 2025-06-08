<template>
  <div id="AddTeamPage">
    <h2 class="header">{{ updatePage ? "修改团队成员" : "添加团队成员" }}</h2>
    <a-divider />
    <a-form :model="form" :style="{ width: '900px' }" @submit="handleSubmit">
      <a-form-item field="name" label="姓名">
        <a-input v-model="form.name" placeholder="请输入姓名" />
      </a-form-item>
      <a-form-item field="gender" label="性别">
        <a-select v-model="form.gender" placeholder="请选择" allow-clear>
          <a-option
            v-for="(item, index) in genderList"
            :key="index"
            :value="item.value"
            :label="item.label"
          />
        </a-select>
      </a-form-item>
      <a-form-item field="ethnicity" label="民族">
        <a-input v-model="form.ethnicity" placeholder="请输入民族" />
      </a-form-item>
      <a-form-item field="department" label="系所">
        <a-input v-model="form.department" placeholder="请输入系所" />
      </a-form-item>
      <a-form-item field="position" label="职务">
        <a-input v-model="form.position" placeholder="请输入职务" />
      </a-form-item>
      <a-form-item field="title" label="职称">
        <a-input v-model="form.title" placeholder="请输入职称" />
      </a-form-item>
      <a-form-item field="phone" label="办公电话">
        <a-input v-model="form.phone" placeholder="请输入办公电话" />
      </a-form-item>
      <a-form-item field="email" label="电子邮箱">
        <a-input v-model="form.email" placeholder="请输入电子邮箱" />
      </a-form-item>
      <a-form-item field="image_url" label="照片">
        <FileUpload :file_path="uploadPath" @update:file-name="afterUpload" />
        <!--        <a-input v-model="form.image_url" placeholder="请输入照片" />-->
      </a-form-item>
      <a-form-item field="profile" label="个人简介">
        <MdEditor :value="form.profile" :handle-change="onProfileChange" />
      </a-form-item>
      <a-form-item field="areas" label="研究领域">
        <a-input v-model="form.areas" placeholder="请输入研究领域" />
      </a-form-item>
      <a-form-item field="courses" label="主讲课程">
        <a-input v-model="form.courses" placeholder="请输入主讲课程" />
      </a-form-item>
      <a-form-item field="patents" label="专利">
        <MdEditor :value="form.patents" :handle-change="onPatentsChange" />
      </a-form-item>

      <a-form-item field="projects" label="科研项目">
        <MdEditor :value="form.projects" :handle-change="onProjectsChange" />
      </a-form-item>

      <a-form-item field="publications" label="论文">
        <MdEditor
          :value="form.publications"
          :handle-change="onPublicationsChange"
        />
      </a-form-item>

      <a-form-item field="honors" label="荣誉">
        <MdEditor :value="form.honors" :handle-change="onHonorsChange" />
      </a-form-item>
      <div style="margin-top: 16px"></div>
      <a-form-item>
        <a-button type="primary" style="min-width: 200px" @click="doSubmit()"
          >提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { Message } from "@arco-design/web-vue";
import router from "@/router";
import { useRoute } from "vue-router";
import { AddTeamMemberParams } from "@/api/types/teamMembers";
import {
  addTeamMember,
  getTeamMemberById,
  updateTeamMember,
} from "@/api/services/teamMembers";
import { genderList } from "@/plugins/constant";
import FileUpload from "@/components/FileUpload.vue";

const uploadPath = ref("teamMember");
const afterUpload = (fileName: string) => {
  form.value.image_url = fileName;
};

const route = useRoute();
// 如果页面地址包含 update，视为更新页面
const updatePage = route.path.includes("update");

const form = ref<AddTeamMemberParams>({});

/**
 * 根据题目 id 获取老的数据
 */
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await getTeamMemberById(Number(id));
  if (res.data.code === 200) {
    form.value = res.data.data;
  } else {
    Message.error("获取团队成员失败");
  }
};
onMounted(() => {
  loadData();
});
/**
 * 提交表单
 */

const doSubmit = async () => {
  // 区分更新还是创建
  if (updatePage) {
    const res = await updateTeamMember({
      id: Number(route.query.id) ?? 0,
      ...form.value,
    });
    if (res.data.code === 200) {
      Message.success("更新成功");
      router.push("/admin/team");
    } else {
      Message.error("更新失败," + res.data.message);
    }
  } else {
    const res = await addTeamMember(form.value);
    if (res.data.code === 200) {
      Message.success("创建成功");
      router.push("/admin/team");
    } else {
      Message.error("创建失败," + res.data.message);
    }
  }
};
const handleSubmit = () => {
  console.log(1);
};
const onProfileChange = (value: string) => {
  form.value.profile = value;
};
const onPatentsChange = (value: string) => {
  form.value.patents = value;
};

const onProjectsChange = (value: string) => {
  form.value.projects = value;
};

const onPublicationsChange = (value: string) => {
  form.value.publications = value;
};

const onHonorsChange = (value: string) => {
  form.value.honors = value;
};
</script>
<style scoped>
#AddTeamPage {
  .header {
    padding: 20px;
  }
}
</style>
