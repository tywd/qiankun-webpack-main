<template>
  <div class="app-container">
    <header class="app-header">
      <nav>
        <router-link to="/">首页</router-link>
        <router-link to="/about">关于</router-link>
        <router-link to="/sub-app">子应用</router-link>
      </nav>
    </header>
    <main class="app-main">
      <router-view />
    </main>
    <footer class="app-footer">
      Qiankun Micro Frontend Demo
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background-color: #2c3e50;
  padding: 1rem;
}

.app-header nav {
  display: flex;
  gap: 1rem;
}

.app-header a {
  color: white;
  text-decoration: none;
  padding: 0.5rem;
}

.app-header a.router-link-exact-active {
  background-color: #34495e;
  border-radius: 4px;
}

.app-main {
  flex: 1;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.app-footer {
  text-align: center;
  padding: 1rem;
  background-color: #f5f5f5;
}
</style>