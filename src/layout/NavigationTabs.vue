<template>
  <nav class="navigation-tabs">
    <div class="tabs-container">
      <div v-for="tab in tabsStore.navTabs" :key="tab.id" :class="['nav-tab', { active: tab.isActive }]"
        @click="switchTab(tab)">
        <span class="tab-name">{{ tab.name }}</span>
        <el-icon v-if="tab.closable" class="tab-close" @click.stop="closeTab(tab.id)">
          <Close />
        </el-icon>
      </div>
    </div>

    <!-- 这里可以添加更多标签页操作，如刷新等 -->
    <!-- <div class="tab-actions">
      <el-tooltip content="刷新当前页面" placement="bottom">
        <el-icon class="action-icon" @click="refreshCurrent">
          <Refresh />
        </el-icon>
      </el-tooltip>
    </div> -->
  </nav>
</template>

<script setup lang="ts">
import { useTabsStore } from '../stores/navigationTabs';
import { useRouter } from 'vue-router';
import { Close, Refresh } from '@element-plus/icons-vue';

const tabsStore = useTabsStore();
const router = useRouter();

// 切换标签页
const switchTab = (tab: any) => {
  tabsStore.setActiveTab(tab.id);
  router.push(tab.path);
};

// 关闭标签页（仅对可关闭的标签页有效）
const closeTab = (tabId: string) => {
  tabsStore.removeNavTab(tabId);
};

// 刷新当前页面
const refreshCurrent = () => {
  // 这里可以实现页面刷新逻辑
  // 对于子应用，可能需要重新加载
  window.location.reload();
};
</script>

<style scoped lang="scss">
.navigation-tabs {
  display: flex;
  align-items: center;

  .tabs-container {
    display: flex;
    overflow-x: auto;

    .nav-tab {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      cursor: pointer;
      min-width: 100px;
      transition: all 0.3s ease;
      position: relative;

      &:hover {
        color: #f0f0f0;

        .tab-close {
          opacity: 1;
        }
      }

      &.active {
        color: rgb(248 141 141);
        font-weight: bold;

        .tab-name {
          font-size: 16px;
        }

        .tab-close:hover {
          background-color: #c6e2ff;
          color: #1890ff;
        }
      }

      .tab-name {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        text-align: center;
      }

      .tab-close {
        margin-left: 8px;
        border-radius: 50%;
        padding: 2px;
        font-size: 12px;
        opacity: 0;
        transition: all 0.3s ease;

        &:hover {
          background-color: #d9d9d9;
          color: #000;
        }
      }
    }
  }

  .tab-actions {
    display: flex;
    align-items: center;
    padding: 0 12px;
    border-left: 1px solid #f0f0f0;

    .action-icon {
      padding: 8px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 16px;
      color: #666;

      &:hover {
        background-color: #f0f0f0;
        color: #1890ff;
      }
    }
  }
}

// 滚动条样式
.navigation-tabs ::-webkit-scrollbar {
  height: 4px;
}

.navigation-tabs ::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.navigation-tabs ::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.navigation-tabs ::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>