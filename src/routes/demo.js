export default {
  name: 'demo',
  title: 'routes.demo',
  component: resolve => require(['views/demo/index'], resolve),
  subRoutes: {
    '/form': {
      name: 'demo/form',
      component: resolve => require(['views/demo/form'], resolve)
    }
  }
}
