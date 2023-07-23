import { createApp } from 'vue'
import App from '@/App.vue'
import '@/style/reset.scss'
import Top from '@/components/top/index.vue'
import Main from '@/pages/index.vue'
import Bottom from '@/components/bottom/index.vue'
import router from '@/router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import pinia from '@/store'
const app = createApp(App)
app.component('Top', Top)
app.component('Main', Main)
app.component('Bottom', Bottom)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(pinia)
app.mount('#app')