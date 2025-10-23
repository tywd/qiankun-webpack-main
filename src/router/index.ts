import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  // 子应用会挂载到这个路由下
  {
    path: '/sub-app/:path(.*)*', // Vue Router 4// 匹配 /sub-app 下的所有路径，需要写成 ‘:path(.*)*’ 才能匹配（包括空路径、单层、多层）
    name: 'SubApp',
    component: () => import('@/views/SubApp.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, _from, next) => {
  console.log('路由守卫', to);
  // 设置页面标题
  if (to.meta?.title) {
    document.title = `微前端应用管理 - ${to.meta.title}`
  }
  next()
})

export default router