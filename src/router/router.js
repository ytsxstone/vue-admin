import main from '@/views/main/main.vue';

export const loginRouter = {
    path: '/',
    name: 'login',
    meta: { title: 'Login-登录' },
    component: () => import('@/views/login/login.vue')
};

export const page401 = {
    path: '/401',
    meta: { title: '401-未授权' },
    name: 'error-401',
    component: () => import('@/views/error/401.vue')
};

export const page403 = {
    path: '/403',
    meta: { title: '403-权限不足' },
    name: 'error-403',
    component: () => import('@/views/error/403.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: { title: '404-页面不存在' },
    component: () => import('@/views/error/404.vue')
};

export const page500 = {
    path: '/500',
    meta: { title: '500-服务端错误' },
    name: 'error-500',
    component: () => import('@/views/error/500.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/main',
    name: 'main',
    meta: { title: '首页' },
    component: main,
    children: [
        { path: 'home', name: 'home', permission: '', meta: { title: '首页' }, component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', name: 'ownspace', permission: '',  meta: { title: '个人中心' }, component: () => import('@/views/own-space/own-space.vue') }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/admin',
        name: 'admin',
        icon: 'key',
        permission: '',
        meta: { title: '系统设置' },
        component: main,
        children: [
            { path: 'user', name: 'user', permission:'Pages.SystemManagement.Users', meta: { title: '用户管理' }, component: () => import('@/views/admin/user/user.vue') },
            { path: 'role', name: 'role', permission:'Pages.SystemManagement.Roles', meta: { title: '角色管理' }, component: () => import('@/views/admin/role/role.vue') }
        ]
    },
    {
        path: '/point',
        name: 'point',
        icon: 'android-share-alt',
        permission: '',
        meta: { title: '积分管理' },
        component: main,
        children: [
            { path: 'rank', name: 'rank', permission:'Pages.PointManagement.PointRanks', meta: { title: '积分等级' }, component: () => import('@/views/point/rank/rank.vue') },
            { path: 'rule', name: 'rule', permission:'Pages.PointManagement.PointRules', meta: { title: '积分规则' }, component: () => import('@/views/point/rule/rule.vue') }
        ]
    },
    {
        path: '/common',
        name: 'common',
        icon: 'android-sad',
        permission: '',
        meta: { title: '错误页面' },
        component: main,
        children: [
            { path: 'error', name: 'error', permission: '', meta: { title: '错误页面' }, component: () => import('@/views/error/error.vue') }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter,
    page401,
    page403,
    page500,
    page404
];