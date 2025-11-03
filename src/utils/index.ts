import { AppNavTab } from '@/types';
import { nanoid } from 'nanoid';
export const getAllApp = () => {
    // 获取主子应用
    const arr: AppNavTab[] = [
        {
            id: nanoid(),
            app: 'main',
            name: '首页',
            path: '/dashboard',
            component: 'Dashboard',
            isActive: true
        },
        {
            id: nanoid(),
            app: 'subApp',
            name: '子应用',
            path: '/sub-app',
            component: 'SubApp',
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

// export const getAllRoutesApp = (appList: any[]) => {
//     return appList.map((app: any) => {
//         return {
//             id: app.id,
//             name: app.name,
//             path: app.path,
//             component: app.component,
//             isActive: app.isActive
//         }
//     }
// }
