
function resolveResource(name) {
  return path.resolve(__dirname, '../static/style/' + name);
}
export function generateSassResourceLoader() {
  var loaders = [
    cssLoader,
    'sass-loader',
    {
      loader: 'sass-resources-loader',
      options: {
        // 多个文件时用数组的形式传入，单个文件时可以直接使用 path.resolve(__dirname, '../static/style/common.scss'
        resources: [resolveResource('common.scss')]  
      }
    }
    ];
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
