import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAppTabsStore } from '@/stores/appTabs';
import { useTabsStore } from '../stores/tabs';
import { useMenuStore } from '../stores/menu';
import { getAllApp } from '@/utils';
import { AppNavTab } from '@/types';

// 子应用会挂载到这个路由下
const subRoutes: RouteRecordRaw[] = [
  {
    path: '/sub-app/:path(.*)*', // Vue Router 4// 匹配 /sub-app 下的所有路径，需要写成 ‘:path(.*)*’ 才能匹配（包括空路径、单层、多层）
    name: 'SubApp',
    component: () => import('@/components/SubApp.vue'),
    meta: { title: '子应用' }
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
router.beforeEach((to, from, next) => {
  console.log('main-路由守卫', to, to.path);
  const appTabsStore = useAppTabsStore();
  const appList = getAllApp();
  if (!appList.length) return;
  if (appTabsStore.navTabs.length === 0) {
    appList.forEach(app => {
      appTabsStore.addNavTab(app);
    });
  }
  const mainRoutes: string[] = ['/dashboard', '/system', '/user-center'] // 主应用的路由
  if (mainRoutes.some(route => to.path.startsWith(route))) { // 激活主应用
    const activeApp: AppNavTab | undefined = appTabsStore.navTabs.find(tab => tab.app === 'main');
    appTabsStore.setActiveTab(activeApp?.id || '');

    const tabsStore = useTabsStore();
    const menuStore = useMenuStore();
    if (to.meta?.title) {
      document.title = to.meta.title as string
      // 主应用设置激活左侧sidebar的菜单
      const menuItem = menuStore.findMenuByPath(to.path);
      if (menuItem) {
        menuStore.setActiveMenu(menuItem.id);
        // 主应用添加标签页
        tabsStore.addTab({
          id: menuItem.id,
          name: to.meta.title as string,
          path: to.path,
          closable: to.path !== '/dashboard', // 首页不可关闭
        });
      }
    }
  } else { // 激活子应用
    appTabsStore.navTabs.forEach(tab => {
      if (to.path.startsWith(tab.path)) {
        appTabsStore.setActiveTab(tab.id);
        return;
      }
    });
  }
  next()
})

export default router