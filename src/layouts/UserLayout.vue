<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/logo.png" class="logo" />
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer"> </a-layout-footer>
    </a-layout>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
#userLayout {
  text-align: center;
  background: url(https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png)
    0% 0% / 100% 100%;
}

#userLayout .logo {
  height: 64px;
}

#userLayout .header {
  margin-top: 60px;
}

#userLayout .content {
  margin-bottom: 16px;
  padding: 20px;
}
</style>
