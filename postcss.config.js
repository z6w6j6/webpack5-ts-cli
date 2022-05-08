
const autoprefixer = require('autoprefixer')// css hack
const postcssPresetEnv = require('postcss-preset-env')
const pxtoviewport = require('postcss-px-to-viewport')
module.exports = {
  plugins: [
    autoprefixer({ // css hack
      // 需要添加的特性
      grid: true, // grid布局特性
      overrideBrowserList: [// 浏览器兼容
        '>1%', // 浏览器份额大一1%的
        'last 3 versions', // 兼容最后三个版本
        'android 4.2',
        'ie 8'
      ]
    }),
    postcssPresetEnv({
      state: 3,
      features: {

      }
    }),
    // 移动端项目才需要,pc端项目无需配置
    pxtoviewport({
      unitToConvert: 'px', // 要转化的单位
      viewportWidth: 1980, // UI设计稿的宽度
      viewportHeight: 1080,
      unitPrecision: 6, // 转换后的精度，即小数点位数
      propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
      fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
      selectorBlackList: ['wrap'], // 指定不转换为视窗单位的类名，
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
      landscape: false // 是否处理横屏情况
    })
  ]
}
