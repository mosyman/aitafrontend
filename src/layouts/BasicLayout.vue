<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-affix>
          <GlobalHeader></GlobalHeader>
        </a-affix>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <GlobalFooter></GlobalFooter>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
import GlobalFooter from "@/components/GlobalFooter.vue";
</script>
<style scoped>
#basicLayout {
}

#basicLayout .header {
  box-shadow: 1px 1px 5px #eee;
  margin-bottom: 5px;
}

#basicLayout .content {
  background-color: #fafafa;
  margin-bottom: 28px;
  padding: 0 20px;
}

#basicLayout .footer {
  background: #f7f8fa;
  padding: 40px 30px;
}
</style>
