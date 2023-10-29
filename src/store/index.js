import {createStore} from 'vuex'
import {login} from "@/database/index.js";
import {decrypt, getBowerId} from "@/utils/security";

export default createStore({
    state: {
        database: null,
        databaseForm: null,
        verifyCode: null,
        mainPasswordType: null,
    },
    mutations: {
        setDatabase(state, database) {
            state.database = database
        },
        delDatabase(state) {
            state.database = null
        },
        setDatabaseForm(state, type) {
            state.databaseForm = type
        },
        delDatabaseForm(state) {
            state.databaseForm= null
        },
        setVerifyCode(state, code) {
            state.verifyCode = code
        },
        setMainPasswordType(state, code) {
            state.mainPasswordType = code
        },
        delVerifyCode(state) {
            state.verifyCode = null
            state.mainPasswordType = null
        }
    },
    actions: {
        // 判断是否登录，未登录时尝试自动登录
        async isLogin(store) {
            return await new Promise((resolve) => {
                if (store.state.database) {
                    // 当前已登录
                    resolve(true)
                    return
                }

                // 获取缓存配置
                let ciphertext = localStorage.getItem('databaseForm')
                if (!ciphertext) {
                    resolve(false)
                    return
                }

                // 解密oss配置信息
                let databaseForm = decrypt(getBowerId(), ciphertext);
                if (!databaseForm) {
                    resolve(false)
                    return
                }

                // 登录
                login(JSON.parse(databaseForm)).then(() => {
                    resolve(true)
                }).catch(() => {
                    resolve(false)
                })
            })
        }
    },
    modules: {}
})

