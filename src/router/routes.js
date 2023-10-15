const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import('@/components/IndexPage.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/components/LoginPage.vue'),
    }
]
export default routes
