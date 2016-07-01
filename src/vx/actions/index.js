const actionsContext = require.context('./', false, /\.js$/)

export default actionsContext.keys().filter(v => v !== './index.js').reduce((actions, key) => {
  return Object.assign(actions, actionsContext(key))
}, {})
