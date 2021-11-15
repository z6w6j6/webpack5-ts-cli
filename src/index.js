
// import previewImg from 'preview-img-zwj';
// import html from './test.html';

// const body = $("body");
// import './css/index.scss'
// import './css/index.less'
// import './css/index.css'
// body.append(html);
// const dom = document.getElementById('img');
// dom.onclick = function(e) {
//   previewImg({ src: e.target.src });
// };
import { createApp } from 'vue' // Vue 3.x 引入 vue 的形式
import App from './App.vue' // 引入 APP 页面组建
const app = createApp(App) // 通过 createApp 初始化 app
// import './components/index' // 引入全局组件
import SvgIcon from './components/SvgIcon/index.vue'// svg组件

// register globally
app.component('svg-icon', SvgIcon)
app.mount('#root') // 将页面挂载到 root 节点

