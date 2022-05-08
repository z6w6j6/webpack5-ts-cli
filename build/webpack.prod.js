const TerserPlugin = require('terser-webpack-plugin') // js压缩
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') // css压缩
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

const bundleAnalyzerReport = process.env.analyzer
let webpackConfig = merge(common, {
  entry: './src/index.ts',
  output: {
    path: __dirname + '/../dist',
    // [contenthash:8] - 本应用打包输出文件级别的更新，导致输出文件名变化
    filename: '[name]-[contenthash:8].js',
    // 编译前清除目录
    clean: true,
  },
  //terser-webpack-plugin 默认开启了 parallel: true 配置，并发运行的默认数量： os.cpus().length - 1 ，
  //  配置的 parallel 数量为 4，使用多进程并发运行压缩以提高构建速度。
  optimization: {
    // 通过配置 optimization.runtimeChunk = true，为运行时代码创建一个额外的 chunk，减少 entry chunk 体积，提高性能。
    // runtimeChunk: true,
    minimizer: [
      // js压缩
      new TerserPlugin(
     {
      terserOptions: {
        // 生产环境自动删除console
        compress: {
          drop_debugger: true,
          drop_console: true,
          pure_funcs: ['console.log']
        }
      },
      parallel: true,
      exclude: /[\\/]node_modules[\\/]/
     }
      ),
      // css压缩
      new CssMinimizerPlugin({
        parallel: 4,
      }),
    ],
  },
})
// 是否开启打包体积预览
if (bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())

  const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
  const smp = new SpeedMeasurePlugin();
  webpackConfig = smp.wrap(webpackConfig)

}


module.exports  = webpackConfig