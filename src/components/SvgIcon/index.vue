<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script type="text/ecmascript-6">
/* icon组件实现自动引入 ../../Icons/svg 下面所有的图标了
*之后我们就要使用到 webpack 的 require.context。
很多人对于 require.context可能比较陌生，
直白的解释就是require.context("./test", false, /.test.js$/); 
这行代码就会去 test 文件夹（不包含子目录）
下面的找所有文件名以 .test.js 结尾的文件能被 require 的文件。 
更直白的说就是 我们可以通过正则匹配引入相应的文件模块*/
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('@/assets/icons/svg', false, /\.svg$/)
requireAll(req)
export default {
  name: 'Svgicon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style>
.svg-icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
  }
</style>
