<template>
  <div class='content'>
    <div class="message">
      <div>
         <c-title>  使用方式：</c-title>
        <p>在对应文件夹中添加需要使用的svg文件</p>
        <p> 本项目中svg存放位置为src\assets\icons\svg</p>
        <p> icon-class字段名为svg文件名称</p>
      </div>
    </div>
      <div>
        <c-title> Demo</c-title>
        <code> {{'<svg-icon icon-class="bug"></svg-icon>'}}</code>
        <div>
          <svg-icon icon-class="404" class="icon"></svg-icon>
          404
          <svg-icon icon-class="bug" class="icon"></svg-icon> bug
          <svg-icon icon-class="bottom" class="icon"></svg-icon>bottom
        </div>
      </div>
      
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SvgIconDemo',
  components: {},
  setup() {
    return {

    }
  }
})
</script>

<style lang='scss' scoped>
.message{
  margin-bottom: 10px;
}
code{
  background: #eee;
  padding: 10px;
  transition:all 3s;
}
.icon{
  color: $mainColor;
  margin: 20px;
  font-size: 30px;
}
</style>
