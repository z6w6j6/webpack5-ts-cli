<template>
  <div class='c-menu'>
   <c-menu-com :menu-list="menuList"></c-menu-com>
  </div>
</template>

<script >
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'App',
  components: {
  },
  setup() {
    const isCollapse = ref(false)
    const router = useRouter()

    const select = (val) => {
      router.push(val)
    }

    // layout层不展示，layout层和hidden的菜单过滤掉
    const dealRoutes = (list) => {
      let routes = []
      list.forEach(item => {
        if (item?.children?.length) {
          routes = dealRouteItem(item.children, routes)
        } else if (item.path !== '/' && !item.hidden) {
          routes.push(item)
        }
      })
      return routes
    }
    const dealRouteItem = (item, routes) => {
      item.forEach(citem => {
        if (citem.path !== '/' && !citem.hidden) {
          routes.push(citem)
        }
      })
      return routes
    }
    const store = useStore()
    const menuList = dealRoutes(store.state.system.renderRoutes)
    return {
      isCollapse,
      select,
      menuList
    }
  }
})
</script>

<style lang='scss' scoped>
.c-menu{

}
</style>
