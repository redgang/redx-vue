const mutationsContext = require.context('./', false, /\.js$/)

export default mutationsContext.keys().filter(v => v !== './index.js').reduce((mutations, key) => {
  mutations[key.replace(/(^\.\/)|(\.js$)/g, '')] = mutationsContext(key)
  return mutations
}, {})
