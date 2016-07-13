const modules = require.context('./', false, /\.vue$/)

/*
  将目录中所有组件名称转成首字母大写的驼峰表达式，然后全部导出。
  例如c-button => CButton，c-group-cell＝>CGroupCell
*/

export default modules.keys().reduce((module, key) => {
  module[key.replace(/-[a-z]/g, $1 => $1.split('-')[1].toUpperCase()).replace(/(^\.\/)|(.vue)$/g, '').replace(/^c/, $1 => $1.toUpperCase())] = modules(key)
  return module
}, {})
