## Router

### 文件

`routes/**.*`

### 依赖

[`vue-router`](https://github.com/vuejs/vue-router/)

### 用法

#### 在 index.js 引入 Router 插件

``` js
import Vue from 'vue'
import Router from 'vue-router'
import { routes, alias } from 'routes'

// 使用插件
Vue.use(Route)

// 创建一个路由器实例
const router = new Router({
  // 选项对象，可选
  history: false,
  saveScrollPosition: true,
  linkActiveClass: 'link-active'
})

// 注册路由与别名
router.map(routes)
router.alias(alias)

// 启动应用
router.start(App, 'app')
```

#### 管理入口

``` js
// routes/index.js
export default {
  routes: {
    '/': require('./home'),
    '/demo': require('./demo'),
    '/about': require('./about'),
    '/login': require('./login'),
    '/logout': require('./logout')
  },

  alias: {
    // '/login/:username': '/login'
  }
}
```

#### 定义路由

``` js
// routes/demo.js
// 结合 Webpack 实现 [动态载入](http://router.vuejs.org/zh-cn/lazy.html) 组件
// 如果无需异步加载，直接 require 即可
export default {
  name: 'demo',
  component: resolve => require(['views/demo/index'], resolve),
  subRoutes: {
    '/form': {
      name: 'demo/form',
      component: resolve => require(['views/demo/form'], resolve)
    },
    '/chart': {
      name: 'demo/chart',
      component: resolve => require(['views/demo/chart'], resolve)
    },
    '/misc': {
      name: 'demo/misc',
      component: resolve => require(['views/demo/misc'], resolve)
    }
  }
}
```
