<template>
  <div class='content'>
    <c-header></c-header>
    <div class="container">
        <c-menu class="c-menu-content"></c-menu>
        <app-main class="main-content"></app-main>
    </div>
  </div>
</template>

<script>
import { CMenu, AppMain, CHeader } from './components'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CLayout',
  components: { CMenu, AppMain, CHeader }
})
</script>

<style lang='scss' scoped>
.container{
  display: flex;
    .c-menu-content{
      min-width: 200px;
    }
    .container{
      flex:1;
    }
}
</style>
