import { createApp } from 'vue' // Vue 3.x 引入 vue 的形式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App'

import { registerCom } from './components/index.ts'

import router from './router/index.ts'
import store from './store/index.ts' // 引入 APP 页面组建
const app = createApp(App) // 通过 createApp 初始化 app

// import { registerEleCom } from './lib/element-plus'// 按需引入element-plus组件
// registerEleCom(app)
app.use(ElementPlus, { size: 'small', zIndex: 3000 }) // 引入全局组件
registerCom(app)
app.use(router)
app.use(store)

app.mount('#root') // 将页面挂载到 root 节点
