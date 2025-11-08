import { AppNavTab } from '@/types';
import { nanoid } from 'nanoid';

// 获取主应用与所有子应用的 appTab
export const getAllApp = () => {
    const subAppList: any[] = getSubApp();
    const subArr: AppNavTab[] = subAppList.map((app: any) => (
        {
            id: nanoid(),
            app: app.name,
            name: app.name,
            path: app.activeRule,
            isActive: false
        }
    ));
    const allAppTab: AppNavTab[] = [
        {
            id: nanoid(),
            app: 'main',
            name: '首页',
            path: '/dashboard',
            isActive: true
        }, ...subArr
    ];
    // const modules = import.meta.glob('../routes/*.ts');
    // Object.keys(modules).forEach(key => {
    //     const module = modules[key];
    //     const routes = module.default;
    //     allRoutes.push(...routes);
    // });
    return allAppTab;
};

// 获取主应用路由
export const getMainRoute = () => {
    const routes = [
        {
            id: nanoid(),
            title: '用户管理',
            name: 'user',
            icon: 'User',
            level: 1,
            path: '/user',
            meta: { title: '用户管理' },
            children: [
                {
                    id: nanoid(),
                    title: '用户列表',
                    name: 'userList',
                    icon: 'List',
                    level: 2,
                    parentId: nanoid(),
                    path: '/user/user-list',
                    meta: { title: '用户列表' }
                },
                {
                    id: nanoid(),
                    title: '角色管理',
                    name: 'userRoles',
                    icon: 'Setting',
                    level: 2,
                    parentId: nanoid(),
                    path: '/user/user-role',
                    meta: { title: '用户角色' }
                }
            ]
        },
        {
            id: nanoid(),
            title: '子应用管理',
            name: 'child',
            icon: 'Setting',
            level: 1,
            path: '/child',
            meta: { title: '子应用管理' },
            children: [
                {
                    id: nanoid(),
                    title: '子应用列表',
                    name: 'childList',
                    path: '/child/child-list',
                    icon: 'Grid',
                    level: 2,
                    parentId: nanoid(),
                    meta: { title: '子应用列表' }
                },
                {
                    id: nanoid(),
                    title: '子应用申请',
                    name: 'childApply',
                    path: '/child/child-apply',
                    icon: 'CirclePlus',
                    level: 2,
                    parentId: nanoid(),
                    meta: { title: '子应用申请' }
                }
            ]
        }
    ]
    return routes
}

// TODO
// 获取子应用列表(如果加了新的子应用，需要在主应用此处注册好新的子应用信息)
export const getSubApp = () => {
    return [
        {
            name: '子应用', // 子应用名称
            entry: 'http://localhost:8081', // 子应用入口
            container: '#micro-app-container', // 挂载容器
            activeRule: '/sub-app', // 激活路由
            props: {
                routerBase: '/sub-app',
                // setGlobalState,
                mainAppInfo: {
                    name: '主应用的全局参数传给子应用'
                }
            }
        },
        {
            name: '脚手架子应用', // 子应用名称
            entry: 'http://localhost:8082', // 子应用入口
            container: '#micro-app-container', // 挂载容器
            activeRule: '/tyteam-ai', // 激活路由
            props: {
                routerBase: '/tyteam-ai',
                // setGlobalState,
                mainAppInfo: {
                    name: '主应用的全局参数传给脚手架子应用'
                }
            }
        }
    ]
};

// TODO
// 获取子应用路由(如果加了新的子应用，需要在主应用此处注册好新的子应用路由信息)
export const getSubRoute = () =>
    [
        {
            path: '/sub-app/:path(.*)*', // Vue Router 4// 匹配 /sub-app 下的所有路径，需要写成 ‘:path(.*)*’ 才能匹配（包括空路径、单层、多层）
            name: 'subApp',
            component: () => import('@/components/SubApp.vue'),
            meta: { title: '子应用' }
        },
        {
            path: '/tyteam-ai/:path(.*)*', // Vue Router 4// 匹配 /sub-app 下的所有路径，需要写成 ‘:path(.*)*’ 才能匹配（包括空路径、单层、多层）
            name: 'aiLlmVue',
            component: () => import('@/components/SubApp.vue'),
            meta: { title: '子应用2' }
        }
    ]

// 处理原始route路径为 vue-router可用的格式
export const transformRoutes = (routes: any[]): any[] => {
    const newRoutes: any[] = routes.map(route => {
        let transformd: any = {
            path: route.path,
            name: route.name,
            meta: route.meta
        }
        if (route.children && route.children.length > 0) {
            transformd.children = transformRoutes(route.children)
        } else {
            transformd.component = () => import(`@/views${route.path}.vue`)
        }
        return transformd
    })
    return newRoutes;
}

// 处理原始route路径为菜单可用的格式
export const transformMenu = (routes: any[]): any[] => {
    const menu: any[] = routes.map(route => {
        const transformd: any = {
            id: route.id,
            title: route.title,
            icon: route.icon,
            level: route.level,
            path: route.path,
            parentId: route.parentId
        }
        if (route.children && route.children.length > 0) {
            transformd.children = transformMenu(route.children);
        }
        return transformd
    })
    return menu;
}