import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { registerMicroApps, start, initGlobalState } from 'qiankun';
import App from './App.vue';
import routes from './router';
import './styles/index.scss';

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes
});

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
const microApps = [
  {
    name: 'vue-sub-app', // 子应用名称
    entry: '//localhost:8081', // 子应用入口
    container: '#micro-app-container', // 挂载容器
    activeRule: '/sub-app', // 激活路由
    props: {
      setGlobalState,
      mainAppInfo: {
        name: 'Main Application'
      }
    }
  }
];

// 注册子应用
// registerMicroApps(microApps, {
//   beforeLoad: (app) => {
//     console.log('子应用加载前:', app.name);
//     return Promise.resolve();
//   },
//   afterMount: (app) => {
//     console.log('子应用挂载后:', app.name);
//     return Promise.resolve();
//   }
// });

// 创建Vue应用
const app = createApp(App);
app.use(router);
app.mount('#app');

// 启动qiankun
// start({
//   sandbox: {
//     strictStyleIsolation: true, // 严格的样式隔离
//     experimentalStyleIsolation: false
//   },
//   prefetch: 'all' // 预加载所有子应用
// });