## vuex

类似 Redux 但更简单的单向数据流实现

### 文件

`vx/**.*`

### 依赖

[`vuex`](https://github.com/vuejs/vuex)


### 用法

#### 在 store.js 引入 Vuex 插件

``` js
// vx/store.js
import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import plugins from './plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  modules,
  plugins
})
```

#### 在 app.vue 中使用 store

``` js
import store from 'vx/store'
export default {
  name: 'App',
  store,
  ...
}
```

### 要求

数据按模块分文件存放于 `src/vx/modules` 目录，并确保模块间数据不互相干扰

- 严格遵循单向数据流
- 组件间通过事件传递数据
  - 使用 $emit
  - 禁止使用 $dispatch 或 $broadcast，因为此特性在 vue@2 中不可用
