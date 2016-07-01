export default {
  icon: 'login',
  title: 'routes.login',
  name: 'login',
  auth: false,
  component: resolve => require(['views/login'], resolve)
}
