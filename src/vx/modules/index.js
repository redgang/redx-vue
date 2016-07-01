const modulesContext = require.context('./', false, /\.js$/)

export default modulesContext.keys().filter(v => v !== './index.js').reduce((modules, key) => {
  modules[key.replace(/(^\.\/)|(\.js$)/g, '')] = modulesContext(key)
  return modules
}, {})
