export default {
  name: 'demo',
  title: 'routes.demo',
  hidden: __DEV__ ? 0 : 1,
  component: resolve => require(['views/demo/index'], resolve),
  subRoutes: {
    '/form': {
      name: 'demo/form',
      component: resolve => require(['views/demo/form'], resolve)
    }
  }
}
