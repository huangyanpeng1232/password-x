import {createI18n} from 'vue-i18n'
import zhCN from './zh-CN'
import enUS from './en-US'

const defaultLang = 'zh-cn'

const i18n = createI18n({
    legacy: false,
    locale: defaultLang,
    messages: {
        'zh-cn': zhCN,
        'en-us': enUS
    }
})

export default i18n