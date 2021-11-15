const mode = process.env.NODE_ENV;//执行packjson的scripts中的命令时传入的参数
const isDev = mode === 'development';

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');//直接复制文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin') 
// import $ from 'expose-loader?$|jquery'//或者在rules中配置
const assetsPath = function (_path) {
  return path.posix.join('.', _path)
}
const config = {};
if (isDev) { //如果是开发环境
  config.devServer = {
    host: 'localhost', //默认localhost
    port: '8086',
    // contentBase:path.join(__dirname,'../dist'),
    // publicPath:'/dist/',
    // historyApiFallback:true,//当设置成true时任意的404响应都可能需要被替代为index.html
    // historyApiFallback:{
    //   rewrites:[
    //     {from:/^\/$/,to:'/views/landing.html'},//以 / 请求的页面会返回这个路径下的html文件
    //     {from:/^\/subpage/,to:'/views/subpage.html'},
    //     // 别的返回404页面
    //     {from:/./,to:'/views/404.html'}
    //   ]
    // },
    hot: true, //开启热替换功能，还需要一个插件才能实现
    open: false, //浏览器是否自动/打开
    // index:'hello.html',//默认是index.html//可更改
    proxy: { //使用代理服务器，解决开发环境跨域问题
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '/api/': ''
        }
      }
    }
    // // 单纯需要一些模拟数据，类似mock？
    // before(app){
    //   app.get('/api',(req,res)=>{
    //     return {title:'你真棒'}
    //   })
    // },
  };
}
module.exports = merge({
  mode, //环境配置,必填
  // watch:true,//开启监听代码一变化就自动打包
  watchOptions: {
    poll: 1000, //每秒打包一次
    aggregateTimeout: 500, //防抖，一直输入代码停止输入500ms后在打包
    ignored: /node_modules/ //不需要监控的文件或者目录
  },
  entry: ["./src/index.js"], //入口配置,必填//"babel-polyfill",
  output: { //打包输出配置，单页面,必填
    path: path.join(__dirname, '../dist'), //必填，文件输出时的文件夹（不存在自动创建）
    filename: `js/[name]${isDev ? '' : ".[contenthash:8]"}.js`//必填，文件输出是文件的名字
  },
  // 多页面
  // entry:{
  //   index:path.join(__dirname,'../src/index.js'),
  //   demo:path.join(__dirname,'../src/demo.js')
  // },
  // output:{
  //   path:path.join(__dirname,'../dist'),
  //   filename:'[name].js'
  // },
  module: { //loader配置项,必填
    rules: [
      {
        test: /\.css$/,
        // css-loader作用是处理css 的各种加载语法，例如@import，url()
        // style-loader才是真正让样式起作用的loader
        // webpack打包时是按数组从后往前的顺序将资源交给loader处理的即数组前面的loader处理的是后面的loader处理完的结果，所以要把最后生效的loader放在最前面
        // 打包后的文件需要将样式放在style标签里的话用style-loader，放在link标签引入用MiniCssExtractPlugin
        use: [
        // 'style-loader'
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // 如果需要配置项的话写在这里，不需要像style-loader一样写就行
            }
          }, 'postcss-loader']
      },
      // sass,less 是css的预处理器需要安装，最终编译成css所以后面还需要css-loader和style-loader处理而且需要安装编译sass 的包node-sass（否则会报错）
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: '/\.less$/',
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: '/\.html$/',
        loader: 'html-loader',
        // use: 'html-loader',//让html可以通过js加载进来
        options: {
          attrs: ['img:src', 'img:data-src', 'audio:src', 'video:src', 'source:src'],
          minimize: true
        }
      },
      // {//打包文件类型的资源，如css中的背景图片字体，html中的img标签中的src路径，加了这个用webpack5的静态资源加载图片加载不出来
      //   test:/\.(png|jpg|gif)$/,
      //   use:{
      //     loader:'file-loader',
      //     options:{
      //       name:'[name].[ext]',
      //       publicPath:'',
      //     }
      //   }
      // },
      // {
      //   test:/\.(png|jpg|gif)$/,
      //   use:{
      //     loader:'url-loader',//作用同file-loader，不同点是可以设置文件大小的阈值，大于阈值时返回publicPath，反之返回文件的base64形式编码
      //     options:{
      //       limit:200,
      //       name:'[name].[ext]',
      //     }
      //   }
      // },
      // {
      //   test: /\.(png|jpg|gif)$/i,
      //   type: 'asset',
      //   parser: {
      //     dataUrlCondition: {
      //       maxSize: 102400
      //     }
      //   }
      // },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset/resource', //webpack5提供的file-loader的功能
        generator: {
          filename: 'img/[contenthash][ext][query]'
        }
      },
      { //打包ts类型文件，tip：使用typescript需安装typescript
        test: /\.ts$/,
        use: 'ts-loader'
      },
      { //babel-loader让我们的js代码更加兼容浏览器环境（不是用来转译的吗）
        // 要使用babel-loader需要下载的包babel-loader @babel/core @babel/preset-env
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            // cacaheDirectory字段为true事启动缓存机制
            // 在重复打包未改变过的模块时防止二次编译
            // 这样可以加快打包速度
            // "cacaheDirectory":true
          }
        },
        exclude: /node_modules/
      },
      // { //js语法校验器
      //   test: /\.js$/,
      //   use: {
      //     loader: 'eslint-loader',
      //     options: {
      //       enforce: 'pre'//默认值：normal，post表示最后执行，通过配置强制最先执行或者写在处理js的loader的最后一个，就会最先执行
      //     }
      //   }
      // },
      {
        // hrml 中的img标签的src不会被转化
        test: /\.html/,
        use: 'html-withimg-loader'
      },
      // { //加了这个配置使用jq，在对应页面引入 import $ from 'jquery'
      //   test: require.resolve('jquery'), //为什么这里要加resolve
      //   // use: 'expose-loader?$'
      //   loader:'expose-loader',
      //   options:{
      //     exposes:"$ jquery", 
      //   }
      // }
    ]
  },
  plugins: [//插件配置项,必填
    new HtmlWebpackPlugin({ //单页面就实例化一个，多页面就实例化多个
      title: 'hello', //html中的title
      template: path.join(__dirname, '../public/index.html'), //html的模板路径
      favicon: path.join(__dirname, '../public/favicon.ico'), //title上favicon的路径
      inject: true, //指定引入的js代码插入位置，默认body最底部，true//也可以指定字符串body或者head
      filename: 'hello.html'//指定打包输出后文件的名字（不指定用原来的名字）
    }),
    // 多页面，几个页面实例化几个
    // new HtmlWebpackPlugin({
    //   chunks:['index'],//多页面需要的配置项
    //   template:path.join(__dirname,'../public/index.html'),//html的模板路径
    //   favicon:path.join(__dirname,'../public/favicon.ico'),//title上favicon的路径
    //   inject:'body',//指定引入的js代码插入位置，默认body最底部，true//也可以指定字符串body或者head
    //   filename:'index.html'//指定打包输出后文件的名字（不指定用原来的名字）
    // }),
    // new HtmlWebpackPlugin({
    //   chunks:['demo'],
    //   template:path.join(__dirname,'../public/demo.html'),//html的模板路径
    //   favicon:path.join(__dirname,'../public/favicon.ico'),//title上favicon的路径
    //   inject:'body',//指定引入的js代码插入位置，默认body最底部，true//也可以指定字符串body或者head
    //   filename:'demo.html'//指定打包输出后文件的名字（不指定用原来的名字）
    // })
    new MiniCssExtractPlugin({
      //抽离的样式叫什么名字,会生成在css文件夹下
      filename: 'css/main.css'
    }),
    new webpack.ProvidePlugin({ //全局引入jquery
      $: 'jquery'
      // jQuery: 'jquery',

    }),
    // new CopyWebpackPlugin([{//是这么用的吗??????????????????????
    //   from:'src/assets/',to:'dist/assests/'
    // }
    // ]),
    new webpack.DefinePlugin({ //用它可以自定义环境变量
      DEV: JSON.stringify('dev'),
      PRODUCTION: JSON.stringify('production')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.BannerPlugin('make 2021 by someone'), //版权说明
    new CleanWebpackPlugin(),
    new ESLintPlugin({
      fix:true,
      extensions:['js','json','coffee'],
      exclude:'/node_modules/'//指定不进行校验的文件夹
    })
  ],
  externals: { //通过script引入了jq，也通过import 引入使用jq会多打包一次
    jquery: 'jQuery'
  },
  resolve: {
    alias: { //用来简化路径
      "@": path.resolve(__dirname, 'src'),
      _c: path.resolve(__dirname, 'src/components'),
      xyz$: path.resolve(__dirname, 'src/views/test/test.js') //后面加$ 表示精准匹配
    },
    // extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx']//默认值为['.wasm','.mjs','.js','.json'],可以改
  },
  devServer: {//服务器配置

  }
}, config);