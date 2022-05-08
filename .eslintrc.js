module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:vue/vue3-essential', // vue3适用
    '@vue/eslint-config-typescript/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  globals: {},
  ignorePatterns: [
    'dist',
    'build',
    'scripts',
    'config',
    '*.html',
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'camelcase': 'off',
    'comma-dangle': 'off',
    'handle-callback-err': 'off',
    'no-unused-vars': 'off',
    'quote-props': 'off',
    'no-extra-semi': 'off',
    'prefer-promise-reject-errors': 'off',
    'prefer-const': 'off',
  }
}
