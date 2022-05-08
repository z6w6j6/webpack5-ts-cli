import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '../layout'
import $store from '../store'
const renderRoutes = [
  {
    path: '/',
    component: layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/index'),
        meta: { title: '首页', isCache: true }
      },
      {
        path: '/componentsDemo',
        name: 'ComponentsDemo',
        meta: { title: '组件示例', isCache: true },
        children: [{
          path: '/SvgIconDemo',
          name: 'SvgIconDemo',
          component: () => import('@/views/ComponentsDemo/SvgIconDemo'),
          meta: { title: '外部引入图标', isCache: true }
        }, {
          path: '/fileupload',
          name: 'FileUpload',
          component: () => import('@/views/ComponentsDemo/FileUpload'),
          meta: { title: '文件上传', isCache: true }
        },
        {
          path: '/filepreview',
          name: 'FilePreview',
          meta: { title: '文件预览', isCache: true },
          children: [{
            path: '/PreviewImg',
            name: 'PreviewImg',
            component: () => import('@/views/ComponentsDemo/FilePreview/PreviewImg.vue'),
            meta: { title: '图片预览', isCache: true }
          },
          {
            path: '/PreviewPdf',
            name: 'PreviewPdf',
            component: () => import('@/views/ComponentsDemo/FilePreview/PreviewPdf'),
            meta: { title: 'PDF预览', isCache: true }
          }]
        }]
      }
    ]
  },
  {
    path: '/login',
    name: 'CLogin',
    hidden: true,
    component: () => import('@/views/CLogin'),
    meta: { title: '登录', isCache: false }
  }
]
// 放到vuex上
$store.dispatch('setRoutes', renderRoutes)
// 使用共同的layout
const dealRoutes = (list) => {
  const routes = [{
    path: '/',
    component: layout,
    redirect: '/index',
    children: []
  }]
  list.forEach(citem => {
    if (citem.path === '/') {
      routes[0].children = dealRoutesItem(citem.children, [])
    } else if (citem.path !== '/') {
      routes.push(citem)
    }
  })
  return routes
}
const dealRoutesItem = (list, routes) => {
  list.forEach(citem => {
    if (citem?.children?.length) {
      routes = dealRoutesItem(citem.children, routes)
    } else if (citem.path !== '/') {
      routes.push(citem)
    }
  })
  return routes
}

const routes = dealRoutes(renderRoutes)
// 设置白名单
// ...
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
