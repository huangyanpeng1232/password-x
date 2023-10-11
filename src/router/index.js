import {createRouter, createWebHistory} from 'vue-router'
import store from "@/store/index.js";

// 导入路由页面的配置
import routes from './routes'

// 路由参数配置
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

// 全局前置守卫，这里可以加入用户登录判断
router.beforeEach((to, from, next) => {

    if (to.path === "/login") {
        next()
        return
    }

    // 是否登录
    store.dispatch('isLogin').then(result => {
        if (result) {
            next()
        } else {
            next({path: '/login'})
        }
    }).catch(() => {
        next({path: '/login'})
    })
})

// 全局后置钩子，这里可以加入改变页面标题等操作
router.afterEach((to, from) => {
    const _title = to.meta.title
    if (_title) {
        window.document.title = _title
    }
})

// 导出默认值
export default router
