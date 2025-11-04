import { AppNavTab } from '@/types';
import { nanoid } from 'nanoid';

// 获取主应用与所有子应用的 appTab
export const getAllApp = () => {
    const arr: AppNavTab[] = [
        {
            id: nanoid(),
            app: 'main',
            name: '首页',
            path: '/dashboard',
            isActive: true
        },
        {
            id: nanoid(),
            app: 'subApp',
            name: '子应用',
            path: '/sub-app',
            isActive: false
        },
        {
            id: nanoid(),
            app: 'subApp2',
            name: '子应用2',
            path: '/sub-app2',
            isActive: false
        }
    ];
    // const modules = import.meta.glob('../routes/*.ts');
    // Object.keys(modules).forEach(key => {
    //     const module = modules[key];
    //     const routes = module.default;
    //     allRoutes.push(...routes);
    // });
    return arr;
};

export const getAllRoute = () => {
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