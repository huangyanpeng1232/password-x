import { createApp } from 'vue'
import router from './router/index'
import i18n from "@/language/index.js";
import ElementPlus from 'element-plus'
import App from './App.vue'

import './style.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import 'element-plus/theme-chalk/dark/css-vars.css'


let app = createApp(App);
app.use(ElementPlus)
app.use(router)
app.use(i18n)
app.mount('#app')
