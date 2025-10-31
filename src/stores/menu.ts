// 菜单状态管理
import { defineStore } from 'pinia';
import { MenuItem } from '../types';

export const useMenuStore = defineStore('menu', {
  state: () => ({
    // 菜单数据（支持多级）
    menus: [
      {
        id: 'dashboard',
        name: '数据看板',
        path: '/dashboard',
        icon: 'DataAnalysis',
        level: 1
      },
      {
        id: 'user-center',
        name: '个人中心',
        path: '/user-center',
        icon: 'User',
        level: 1,
      },
      // {
      //   id: 'user-management',
      //   name: '用户管理',
      //   icon: 'User',
      //   level: 1,
      //   children: [
      //     {
      //       id: 'user-list',
      //       name: '用户列表',
      //       path: '/user/list',
      //       icon: 'List',
      //       level: 2,
      //       parentId: 'user-management'
      //     },
      //     {
      //       id: 'user-roles',
      //       name: '角色管理',
      //       path: '/user/roles',
      //       icon: 'Setting',
      //       level: 2,
      //       parentId: 'user-management'
      //     }
      //   ]
      // },
      {
        id: 'system-management',
        name: '系统管理',
        icon: 'Setting',
        level: 1,
        children: [
          {
            id: 'sub-management',
            name: '子应用管理',
            path: '/system/sub-management',
            icon: 'Grid',
            level: 2,
            parentId: 'system-management'
          },
          {
            id: 'sub-apply',
            name: '子应用申请',
            path: '/system/sub-apply',
            icon: 'CirclePlus',
            level: 2,
            parentId: 'system-management'
          },
          {
            id: 'system-settings',
            name: '系统设置',
            path: '/system/settings',
            icon: 'Tools',
            level: 2,
            parentId: 'system-management'
          }
        ]
      }
    ] as MenuItem[],
    collapsed: false, // 侧边栏是否折叠
    activeMenu: 'dashboard', // 当前激活的菜单
    openMenus: ['dashboard'] as string[] // 展开的菜单项
  }),

  getters: {
    // 扁平化菜单用于面包屑
    flatMenus: (state) => {
      const flatten: MenuItem[] = [];
      const flattenMenus = (menus: MenuItem[]) => {
        menus.forEach(menu => {
          if (menu.path) {
            flatten.push(menu);
          }
          if (menu.children) {
            flattenMenus(menu.children);
          }
        });
      };
      flattenMenus(state.menus);
      return flatten;
    },

    // 获取面包屑路径
    breadcrumb: (state) => (path: string) => {
      const breadcrumb: Array<{ title: string; path?: string; icon?: string }> = [];
      
      const findPath = (menus: MenuItem[], targetPath: string): boolean => {
        for (const menu of menus) {
          if (menu.path === targetPath) {
            breadcrumb.unshift({ 
              title: menu.name, 
              path: menu.path,
              icon: menu.icon 
            });
            return true;
          }
          if (menu.children) {
            if (findPath(menu.children, targetPath)) {
              if (menu.name) {
                breadcrumb.unshift({ 
                  title: menu.name, 
                  path: menu.path,
                  icon: menu.icon 
                });
              }
              return true;
            }
          }
        }
        return false;
      };

      findPath(state.menus, path);
      return breadcrumb;
    }
  },

  actions: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },

    setCollapsed(collapsed: boolean) {
      this.collapsed = collapsed;
    },

    setActiveMenu(menuId: string) {
      this.activeMenu = menuId;
    },

    // 切换菜单展开状态
    toggleMenu(menuId: string) {
      const index = this.openMenus.indexOf(menuId);
      if (index > -1) {
        this.openMenus.splice(index, 1);
      } else {
        this.openMenus.push(menuId);
      }
    },

    // 根据路径查找菜单
    findMenuByPath(path: string): MenuItem | null {
      const findInMenus = (menus: MenuItem[]): MenuItem | null => {
        for (const menu of menus) {
          if (menu.path === path) {
            return menu;
          }
          if (menu.children) {
            const found = findInMenus(menu.children);
            if (found) return found;
          }
        }
        return null;
      };
      return findInMenus(this.menus);
    },
    
    // 获取面包屑路径
    getBreadcrumb(path: string) {
      return this.breadcrumb(path);
    }
  }
});