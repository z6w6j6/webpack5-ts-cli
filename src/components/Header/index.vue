
<template>
<div>
  <el-input v-model="input" placeholder="请输入内容"></el-input>
 <el-color-picker v-model="color1" />
  <el-rate v-model="value2" :colors="colors"> </el-rate>
   <svg-icon icon-class="404"></svg-icon>
   <el-button>hhh333</el-button>
   <img src="../../assets/img/6.jpg" alt="">
   <audio width="320" height="240" controls>
      <source src="../../assets/2.mp3"  >
   </audio>
    <video width="320" height="240" controls>
        <source src="../../assets/VID_20210911_155955.mp4" type="video/mp4">
    </video>
</div>
</template>

<script>
import {defineComponent,ref } from 'vue'
export default defineComponent({
    name:'App',
    components: {
    },
    setup() {
        const input = ref('#409EFF')
        const color1 = ref('#409EFF')
        return {
            input,
            color1,
            value2: ref(null),
      colors: ref(['#99A9BF', '#F7BA2A', '#FF9900']),
            }
    }
})
</script>

<style lang="scss">
.size {
  width: 100%;
  height: 100%;
}
html,body {
  margin: 0;
  padding: 0;
  color: $blue;
}

.grey__mode {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
}
</style>
