<template>
  <el-menu
      :default-active="active"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @select="select"
    >
      <c-menu-item v-for="item in menus" :item="item" :key="item.path"></c-menu-item>
    </el-menu>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import CMenuItem from './CMenuItem'
export default defineComponent({
  name: 'CMenuCom',
  components: {
    CMenuItem
  },
  props: {
    menuList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup(props) {
    const isCollapse = ref(false)
    const router = useRouter()
    const menus = props.menuList
    const select = (val) => {
      router.push(val)
    }
    const hash = location.hash.split('#')
    const active = reactive(hash[1])
    return {
      isCollapse,
      select,
      menus,
      active
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
