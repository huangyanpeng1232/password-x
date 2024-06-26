import {createApp} from 'vue'
import router from './router/index'
import i18n from "@/language/index.js";
import App from './App.vue'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

let app = createApp(App);
app.use(router)
app.use(i18n)
app.mount('#app')
