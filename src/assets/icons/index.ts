// ts环境下vscode会提示require不存在context方法，解决办法： cnpm i @types/webpack-env @types/node -D
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
