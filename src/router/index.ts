import { RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  // 子应用会挂载到这个路由下
  {
    path: '/sub-app/*',
    name: 'SubApp',
    component: () => import('@/views/SubApp.vue')
  }
];

export default routes;