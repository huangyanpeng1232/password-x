const routes = [
    {
        path: '/login',
        name: 'Login',
        title: '首页',
        component: () => import('@/components/Login.vue'), //.vue不能省略
    }
]
export default routes
