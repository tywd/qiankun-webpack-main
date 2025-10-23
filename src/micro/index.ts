import { registerMicroApps, start, initGlobalState, addGlobalUncaughtErrorHandler } from 'qiankun'
import type { RegistrableApp } from 'qiankun'

// 初始化全局状态
const initialState = {
  userInfo: {
    name: 'Guest',
    token: ''
  },
  appName: 'Main App'
};

const { onGlobalStateChange, setGlobalState } = initGlobalState(initialState);

// 监听全局状态变化
onGlobalStateChange((value, prev) => {
  console.log('全局状态变化:', value, prev);
});

// 注册子应用 - 这里先配置一个示例，后续会实际创建
const microApps: RegistrableApp<any>[] = [
  {
    name: 'sub-app', // 子应用名称
    entry: 'http://localhost:8081', // 子应用入口
    container: '#micro-app-container', // 挂载容器
    activeRule: '/sub-app', // 激活路由
    props: {
      routerBase: '/sub-app',
      // setGlobalState,
      mainAppInfo: {
        name: 'Main Application'
      }
    }
  }
];

// 注册微应用
export function registerApps() {
  console.log('注册微应用配置:', microApps)
  registerMicroApps(microApps, {
    beforeLoad: (app) => {
      console.log('开始加载微应用:', app.name, 'entry:', app.entry)
      // appEvents.mounted(app.name)
      return Promise.resolve()
    },
    beforeMount: (app) => {
      console.log('开始挂载微应用:', app.name)
      return Promise.resolve()
    },
    afterMount: (app) => {
      console.log('微应用挂载完成:', app.name)
      return Promise.resolve()
    },
    beforeUnmount: (app) => {
      console.log('开始卸载微应用:', app.name)
      return Promise.resolve()
    },
    afterUnmount: (app) => {
      console.log('微应用卸载完成:', app.name)
      // appEvents.unmounted(app.name)
      return Promise.resolve()
    }
  });
}

// 全局标记，确保qiankun只启动一次
let isQiankunStarted = false
// 按需启动微前端（当容器元素存在时调用）
export function startMicroAppsOnDemand() {
  if (isQiankunStarted) {
    console.log('qiankun已经启动，跳过重复启动')
    return Promise.resolve()
  }

  return new Promise<void>((resolve, reject) => {
    // 检查容器是否存在
    const container = document.querySelector('#micro-app-container')
    if (!container) {
      console.error('微前端容器不存在，无法启动qiankun')
      reject(new Error('Container not found'))
      return
    }

    console.log('容器已存在，开始启动qiankun')

    try {
      // 启动qiankun
      start({
        prefetch: 'all', // 预加载所有微应用
        sandbox: {
          strictStyleIsolation: false,  // 关闭严格样式隔离，避免Element Plus样式问题
          experimentalStyleIsolation: false // 关闭实验性样式隔离，减少样式冲突
        },
        singular: false, // 是否为单实例场景
        fetch: (url, options) => {
          // 自定义fetch，增强错误处理
          console.log('正在加载微应用资源:', url)
          return window.fetch(url, {
            ...options,
            mode: 'cors',
            credentials: 'omit'
          }).catch(error => {
            console.error('微应用资源加载失败:', url, error)
            throw error
          })
        }
      })

      isQiankunStarted = true
      console.log('qiankun启动成功')
      resolve()
    } catch (error) {
      console.error('qiankun启动失败:', error)
      reject(error)
    }
  })
}

// 全局错误处理
export function setupErrorHandler() {
  addGlobalUncaughtErrorHandler((event) => {
    console.error('微应用加载错误:', event)
    console.error('错误类型:', typeof event)
    console.error('错误详情:', JSON.stringify(event, null, 2))
    // appEvents.error('unknown', event)
    // 这里可以添加错误上报逻辑
  })
}
// 导出全局状态管理
export { onGlobalStateChange, setGlobalState }
export { microApps }