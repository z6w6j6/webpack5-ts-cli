
<template>
  <div id="app" >
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'App',
  components: {
  },
  setup () {
    const test = ref('HHHH')
    return {
      test
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
  color: $fontColor;
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
