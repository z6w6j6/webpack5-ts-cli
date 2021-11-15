
module.exports = {
  root: true,
  parserOptions: {
    "ecmaVersion": 7,
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    node: true
  },
  plugins: [
    // 'vue'
  ],
  extends: [
    // 'plugin:vue/recommended',
    // 'eslint:recommended',//导致全局配置的jq 失效，document也变成未定义的变量
    // '@vue/standard'
  ],
  rules: {
    'space-before-function-paren': [1, 'never'],
    'object-shorthand': 1,
    'no-callback-literal': 0,
    // 'no-console':['error']
  }
}
