const routes = [
    {
        path: '/',
        name: 'Index',
        title: '密码管理',
        component: () => import('@/components/Index.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        title: '密码管理-登录',
        component: () => import('@/components/Login.vue'),
    }
]
export default routes
