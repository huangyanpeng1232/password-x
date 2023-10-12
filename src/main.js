import { createApp } from 'vue'
import './style.css'
import router from './router/index'
import i18n from "@/language/index.js";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import App from './App.vue'

let app = createApp(App);
app.use(ElementPlus)
app.use(router)
app.use(i18n)
app.mount('#app')
