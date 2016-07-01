const constantsContext = require.context('./', false, /\.js$/)

export default constantsContext.keys().filter(v => v !== './index.js').reduce((constants, key) => {
  return Object.assign(constants, constantsContext(key))
}, {})
