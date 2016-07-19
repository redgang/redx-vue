### [vuex2.0](https://github.com/vuejs/vuex/issues/236)

#### modules中文件定义规则

－ 公共modules定义规则
  - `constants` 定义在`vx/constants.js`

－ 业务modules定义规则
  - 每个modules文件包含`constants`、`state`、`getters`、`actions`、`mutations`

  ```
    /**
    * actions、mutations中用的常量
    */
    const MODULESCONSTANTS = 'MODULESCONSTANTS'

    /**
    * vuex的state
    */
    const state = {
      modulesInitState: null //具体值根据业务来
    }

    /**
    * vuex的getters
    */
    const getters = {
      modulesGetter : state => state.modulesGetter
    }

    /**
    * vuex中的actions
    */
    const actions = {
      modulesAction ({ commit }, payload) {
        
      }
    }

    /**
    * vuex中的mutations
    */
    const mutations = {
      [MODULESCONSTANTS] (state, { payload, meta }) {
        
      }
    }

    export default {
      state,
      getters,
      actions,
      mutations
    }
  ```


#### 用法

```
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    localComputed () { … },
    ...mapGetters(['a', 'b', 'c', 'd'])
  },
  methods: {
    localMethod () { … },
    ...mapActions(['b'])
  }
}
```
#### 注意

----

- mapGetters中的a,b,c,d为modules目录中文件定义的getters的key值
- mapActions中的b为modules目录中文件定义actions的key值
- 在actions中，每个方法第一个参数为由{ dispatch }改为{ commit }
- 页面直接通过store调用action时，使用`store.dispatch('actionName')`