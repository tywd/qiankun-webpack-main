import { defineStore } from 'pinia';
import { UserInfo } from '../types';

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      id: '1',
      name: '管理员',
      avatar: '/avatar.jpeg',
      role: '超级管理员'
    } as UserInfo,
    isLoggedIn: true
  }),

  actions: {
    // 更新用户信息
    updateUserInfo(userInfo: Partial<UserInfo>) {
      this.userInfo = { ...this.userInfo, ...userInfo };
    },

    // 退出登录
    logout() {
      this.isLoggedIn = false;
      this.userInfo = {} as UserInfo;
      // 这里可以添加跳转到登录页的逻辑
    }
  }
});