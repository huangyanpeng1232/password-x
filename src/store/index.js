import {createStore} from 'vuex'
import {login} from "@/database/index.js";
import {decrypt, getBowerId} from "@/utils/security";
import {getSystemConfig} from "@/utils/global.js";

export default createStore({
    state: {
        // oss、cos对象
        database: null,
        // 数据库配置信息
        databaseForm: null,
        // 主密码校验码
        verifyCode: null,
        // 主密码类型 手势 gesture、普通 common
        mainPasswordType: null,
        // 设置是否与缓存同步
        settingSync: false,
        // 系统设置
        setting: {
            // 语言
            language: 'zh-cn',
            // 缓存主密码
            cacheMainPassword: true,
            // 创建时自动生成一次密码
            autoGeneratePassword: true,
            // 暗黑模式
            darkMode: false,
            // 排序规则
            sortRule: 'insertTimeDesc',
            // 显示密码强度
            showPasswordStrength: false,
            // 缓存登录信息
            cacheDatabaseForm: true,
            // 显示添加时间
            showAddTime: false,
            // 显示更新时间
            showUpTime: false,
            // 手势主密码验证时显示手势
            verifyShowGesture: true,
            // 启用标签
            enableLabel: true,
            // 显示标签
            showLabel: true,
            // 默认密码生成规则
            defaultPasswordRule: {
                length: 16,
                number: true,
                lowercase: true,
                uppercase: true,
                symbol: true,
            }
        }
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
        delVerifyCode(state) {
            state.verifyCode = null
            state.mainPasswordType = null
        },
        setMainPasswordType(state, code) {
            state.mainPasswordType = code
        },
        updateSetting(state, setting) {
            state.setting = setting
        },
        syncSetting(state) {
            state.settingSync = true
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
                let cacheDatabaseForm = getSystemConfig('cacheDatabaseForm')
                if (cacheDatabaseForm === false) {
                    resolve(false)
                    return
                }
                let ciphertext = localStorage.getItem('databaseForm');
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

