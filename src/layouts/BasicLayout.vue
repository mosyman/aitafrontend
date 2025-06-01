<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader></GlobalHeader>
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
  margin-bottom: 16px;
}

#basicLayout .content {
  margin-bottom: 16px;
  padding: 20px;
}

#basicLayout .footer {
  background: #efefef;
  padding: 14px;
  position: sticky;
  bottom: 0;
  right: 0;
  left: 0;
  text-align: center;
}
</style>
