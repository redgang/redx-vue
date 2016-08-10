export default {
  icon: 'docs',
  title: 'routes.docs',
  name: 'docs',
  hidden: __DEV__ ? 0 : 1,
  component: resolve => require(['views/docs'], resolve),
  subRoutes: {
    '/:name': {
      name: 'docs/read',
      component: resolve => require(['views/docs/read'], resolve)
    }
  }
}
