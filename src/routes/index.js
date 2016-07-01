export default {
  routes: {
    '/': require('./home'),
    '/about': require('./about'),
    '/login': require('./login'),
    '/logout': require('./logout'),
    '/demo': require('./demo'),
    '/docs': require('./docs')
  },

  alias: {
    // '/login/:username': '/login'
  }
}
