<template>
  <div class="sub-app-container">
    <h1>子应用加载区</h1>
    <!-- 子应用将被挂载到这个容器 -->
    <div id="micro-app-container" class="micro-container"></div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.sub-app-container {
  padding: 2rem;
}

.micro-container {
  margin-top: 1rem;
  min-height: 400px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 1rem;
}
</style>