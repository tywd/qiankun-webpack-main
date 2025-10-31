import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useTabsStore } from '../stores/tabs';
import { useMenuStore } from '../stores/menu';

// 子应用会挂载到这个路由下
const subRoutes: RouteRecordRaw[] = [
  {
    path: '/sub-app/:path(.*)*', // Vue Router 4// 匹配 /sub-app 下的所有路径，需要写成 ‘:path(.*)*’ 才能匹配（包括空路径、单层、多层）
    name: 'SubApp',
    component: () => import('@/components/SubApp.vue')
  }
];

const mainRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { title: '数据看板' }
  },
  {
    path: '/user-center',
    name: 'UserCenter',
    component: () => import('@/views/UserCenter.vue'),
    meta: { title: '用户中心' }
  },
  {
    path: '/system',
    name: 'System',
    children: [
      {
        path: '/system/sub-management',
        name: 'SubManagement',
        component: () => import('@/views/system/SubManagement.vue'),
        meta: { title: '子应用管理' }
      },
      {
        path: '/system/sub-apply',
        name: 'SubApply',
        component: () => import('@/views/system/SubApply.vue'),
        meta: { title: '子应用申请' }
      },
      {
        path: '/system/settings',
        name: 'Settings',
        component: () => import('@/views/system/Settings.vue'),
        meta: { title: '系统设置' }
      }
    ]
  }
];

const routes: RouteRecordRaw[] = [...mainRoutes, ...subRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, _from, next) => {
  console.log('路由守卫', to);
  const tabsStore = useTabsStore();
  const menuStore = useMenuStore();
  if (to.meta?.title) {
    document.title = `微前端应用管理 - ${to.meta.title}`
    // 添加标签页
    tabsStore.addTab({
      name: to.meta.title as string,
      path: to.path,
      closable: to.path !== '/dashboard', // 首页不可关闭
      component: to.name as string
    });
    // 设置激活的菜单
    const menuItem = menuStore.findMenuByPath(to.path);
    if (menuItem) {
      menuStore.setActiveMenu(menuItem.id);
    }
  }
  next()
})

export default router