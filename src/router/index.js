import {createRouter, createWebHistory} from 'vue-router'
import store from "@/store/index.js";

// 导入路由页面的配置
import routes from './routes'

// 路由参数配置
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

// 全局前置守卫，用户登录判断
router.beforeEach((to, from, next) => {
    console.log('router change：', to.path)
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

// 导出默认值
export default router
