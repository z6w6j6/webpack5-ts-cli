/**
 * 对象数组深拷贝
 * @param {Array,Object} source 需要深拷贝的对象数组
 * @param {Array} noClone 不需要深拷贝的属性集合
 */
export function deepClone(source, noClone = []) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object' && noClone.indexOf(keys) === -1) {
      targetObj[keys] = deepClone(source[keys], noClone)
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
// 驼峰转换中划线
export function camelToUnderline(str) {
  return str.replace(/[A-Z]/g, function(s) {
    return ' ' + s.toLowerCase()
  }).trim().replaceAll(' ', '-')
}
// 中划线转换驼峰
export function underlineToCamel(str) {
  return str.replace(/\-(\w)/g, (all, letter) => letter.toUpperCase())
}
