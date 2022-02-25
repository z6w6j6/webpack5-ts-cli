<template>
  <el-menu-item :index="item.path" v-if="(!item.children || !item.children.length) && !item.hidden">
    <template #title> {{item.meta && item.meta.title}}</template>
  </el-menu-item>
  <el-sub-menu :index="item.path" v-else-if="item.children && item.children.length>0  && !item.hidden">
    <template #title><span>{{item.meta && item.meta.title}}</span></template>
    <menu-item v-for="citem in item.children" :item="citem" :key="citem.path"></menu-item>
  </el-sub-menu>
</template>

<script>

import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MenuItem',
  components: {},
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup() {
    return {

    }
  }
})
</script>

<style lang='scss' scoped>

</style>
