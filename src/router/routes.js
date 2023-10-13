const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import('@/components/Index.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/components/Login.vue'),
    }
]
export default routes
