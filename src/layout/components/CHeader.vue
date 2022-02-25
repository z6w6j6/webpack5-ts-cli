<template>
  <div class='c-header'>
    <div class="title">
      {{systemName}}
    </div>
    <div class="user">
      <span>{{userName}}</span> | <span @click="logout" class="logout">退出</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const userName = ref('拒绝')
    const store = useStore()
    const router = useRouter()// 不能放在函数里面定义
    function logout() {
      // 清除缓存
      router.push('/login')
    }
    return {
      userName,
      systemName: store.getters.systemTitle,
      logout
    }
  }
})
</script>

<style lang='scss' scoped>
.c-header{
  padding:20px;
  color: #fff;
  background-color: $mainColor;
  overflow: auto;
  height: 40px;
  line-height: 40px;
  .title{
    float: left;
    font-size: 20px;
    font-weight: 600;
    font-family: cursive;
  }
  .user{
    float: right;
   .logout{
      cursor: pointer;
   }
  }
}
</style>
