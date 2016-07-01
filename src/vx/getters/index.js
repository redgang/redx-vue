import modules from '../modules'

const getters = {}

// defaults
Object.keys(modules).forEach(key => {
  getters[key] = state => state[key][key]
})

// customize, override defaults
const gettersContext = require.context('./', false, /\.js$/)
export default gettersContext.keys().filter(v => v !== './index.js').reduce((getters, key) => {
  return Object.assign(getters, gettersContext(key))
}, getters)
