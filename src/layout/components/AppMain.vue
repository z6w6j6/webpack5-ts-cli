<template>
  <div class='app-main'>
    <el-card>
      <router-view></router-view>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  components: {},
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang='scss' scoped>
.app-main{
  padding: 20px;
  width: 100%;
}
</style>
