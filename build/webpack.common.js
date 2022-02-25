
// eslint，babel，less，
const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')// 提取css到单独的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const resolve = function(val) {
  return path.resolve(__dirname, val)
}
module.exports = {
  entry: resolve('../src/index.ts'),
  output: {
    path: resolve('../dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      // 处理vue文件
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.mjs$/i,
        resolve: { byDependency: { esm: { fullySpecified: false }}}
      },
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
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'sass-loader',
          'postcss-loader',
          { loader: 'sass-resources-loader',
            options: {
              resources: [
                'src/css/index.scss' // 引入 mixins 和 functions 的文件
                // 'src/style/settings/var.scss',     // 引入全局 SasS 变量的文件
              ]
            }
          }
        ]
      },
      {
        test: '/\.html$/',
        loader: 'html-loader'
        // use: 'html-loader',//让html可以通过js加载进来
        // options: {
        //   attrs: ['img:src', 'img:data-src', 'audio:src', 'video:src', 'source:src'],
        //   minimize: true
        // }
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset/resource', // webpack5提供的file-loader的功能
        exclude: [path.resolve(__dirname, '../src/assets/icons')], // svg资源引入同一文件只能二者选一个处理方式//指定文件夹svg不处理
        generator: {
          filename: 'img/[contenthash][ext][query]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 102400
          }
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [path.resolve(__dirname, '../src/assets/icons')], // svg资源引入同一文件只能二者选一个处理方式，只处理指定文件夹svg
        options: {
          symbolId: 'icon-[name]'
        }
      },
      { // mp4 安装vue后生效，MP3放在source里生效
        test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[contenthash][ext][query]'
        }
      },
      { // babel-loader让我们的js代码更加兼容浏览器环境（不是用来转译的吗）
        // 要使用babel-loader需要下载的包babel-loader @babel/core @babel/preset-env
        test: /\.(t|j)s$/,
        use: [{
          loader: 'babel-loader',
          options: {
            // cacheDirectory字段为true事启动缓存机制
            // 在重复打包未改变过的模块时防止二次编译
            // 这样可以加快打包速度
            'cacheDirectory': true
          }
        }],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // 抽离的样式叫什么名字,会生成在css文件夹下
      filename: 'css/main.css'
    }),
    new HtmlWebpackPlugin({ // 单页面就实例化一个，多页面就实例化多个
      title: 'hello', // html中的title
      template: path.join(__dirname, '../public/index.html'), // html的模板路径
      favicon: path.join(__dirname, '../public/favicon.ico'), // title上favicon的路径
      inject: true // 指定引入的js代码插入位置，默认body最底部，true//也可以指定字符串body或者head
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({ // 用它可以自定义环境变量
      DEV: JSON.stringify('dev'),
      PRODUCTION: JSON.stringify('production')
    }),
    new webpack.BannerPlugin('make 2021 by someone'), // 版权说明
    new webpack.ProvidePlugin({ // 全局引入jquery
      $: 'jquery'
      // jQuery: 'jquery',
    }),
    new ESLintPlugin({
      fix: true,
      extensions: ['js', 'json', 'coffee', 'vue'],
      exclude: '/node_modules/'// 指定不进行校验的文件夹
    })
  ],
  externals: { // 通过script引入了jq，也通过import 引入使用jq会多打包一次
    jquery: 'jQuery'
  },
  resolve: {
    mainFiles: ['index'],
    alias: { // 用来简化路径
      '@': path.resolve(__dirname, '../src'),
      _c: path.resolve(__dirname, '../src/components'),
      _v: path.resolve(__dirname, '../src/views'),
      xyz$: path.resolve(__dirname, '../src/views/test/test.js') // 后面加$ 表示精准匹配
    },
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.vue', '.ts', '...']// 默认值为['.wasm','.mjs','.js','.json'],可以改
  }
}
