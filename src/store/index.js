import {createStore} from 'vuex'
import {login as loginOSS} from "@/utils/oss";
import {decrypt, getBowerId} from "@/utils/security";
import {useRouter} from "vue-router";

const router = useRouter()
export default createStore({
    state: {
        oss: null,
        verifyCode: null,
        mainPasswordType: null,
    },
    mutations: {
        setOss(state, oss) {
            state.oss = oss
        },
        delOss(state) {
            state.oss = null
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
                if (store.state.oss) {
                    // 当前已登录
                    resolve(true)
                    return
                }

                // 获取缓存配置
                let ciphertext = localStorage.getItem('ossForm')
                if (!ciphertext) {
                    resolve(false)
                    return
                }

                // 解密oss配置信息
                let ossFormContent = decrypt(getBowerId(), ciphertext);
                if (!ossFormContent) {
                    resolve(false)
                    return
                }

                let ossForm = JSON.parse(ossFormContent);

                // 登录oss
                loginOSS(ossForm).then(oss => {
                    store.commit('setOss', oss)
                    resolve(true)
                }).catch(() => {
                    resolve(false)
                })
            })
        }
    },
    modules: {}
})

