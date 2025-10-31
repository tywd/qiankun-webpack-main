// 应用的tab访问状态管理
import { defineStore } from 'pinia';
import { NavTab } from '../types';

export const useTabsStore = defineStore('navigationTabs', {
  state: () => ({
    // 导航Tabs数据(用于切换主子应用)
    navTabs: [
      {
        id: 'dashboard',
        name: '首页',
        path: '/dashboard',
        component: 'Dashboard',
        closable: false,
        isActive: true
      },
      {
        id: 'sub-app',
        name: '子应用',
        path: '/sub-app',
        component: 'SubApp',
        closable: false,
        isActive: false
      }
    ] as NavTab[],
    activeTabId: 'dashboard' as string
  }),

  getters: {
    activeTab: (state) => state.navTabs.find(tab => tab.id === state.activeTabId),
    activeComponent: (state) => {
      const activeTab = state.navTabs.find(tab => tab.id === state.activeTabId);
      return activeTab ? activeTab.component : 'Dashboard';
    }
  },

  actions: {
    // 切换激活的Tab
    setActiveTab(tabId: string) {
      this.navTabs = this.navTabs.map(tab => ({
        ...tab,
        isActive: tab.id === tabId
      }));
      this.activeTabId = tabId;
    },

    // 添加新的导航Tab（用于后续扩展）
    addNavTab(tab: Omit<NavTab, 'id' | 'isActive'>) {
      const newTab: NavTab = {
        ...tab,
        id: `tab-${Date.now()}`,
        isActive: true
      };
      
      // 先将所有tab设为非激活
      this.navTabs = this.navTabs.map(tab => ({
        ...tab,
        isActive: false
      }));
      
      this.navTabs.push(newTab);
      this.activeTabId = newTab.id;
    },

    // 移除导航Tab（对于可关闭的Tab）
    removeNavTab(tabId: string) {
      if (this.navTabs.length <= 1) return; // 至少保留一个Tab
      
      const tabIndex = this.navTabs.findIndex(tab => tab.id === tabId);
      if (tabIndex === -1) return;
      
      const isActive = this.activeTabId === tabId;
      this.navTabs.splice(tabIndex, 1);
      
      if (isActive) {
        // 如果删除的是当前激活的Tab，激活前一个Tab
        const newIndex = Math.max(0, tabIndex - 1);
        this.setActiveTab(this.navTabs[newIndex].id);
      }
    }
  }
});