export default {
  icon: 'logout',
  title: 'routes.logout',
  name: 'logout',
  auth: true,
  component: resolve => require(['views/logout'], resolve)
}
