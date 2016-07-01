import Vue from 'vue'
import Router from 'vue-router'
import Validator from 'plugins/validator'
import I18n from 'plugins/i18n'
import App from 'app'
import { routes, alias } from 'routes'
import store from 'vx/store'
import { env, progress } from 'vx/getters'
import { setProgress } from 'vx/utils'

if (module.hot) {
  module.hot.accept()
}

//  dev global debug
Vue.config.debug = __DEV__

// global mixins
Vue.mixin({
  vuex: {
    getters: {
      env,
      progress
    }
  }
})

// form validator use
Vue.use(Validator)

// I18n use
Vue.use(I18n, {
  data () {
    return env(store.state).i18n
  }
})

//  vue-router use
Vue.use(Router)

const router = new Router({
  history: false,
  saveScrollPosition: true,
  linkActiveClass: 'link-active'
})

// register routes
router.map(routes)
router.alias(alias)

//  auth check
router.beforeEach(transition => {
  if (transition.to.auth && !env(store.state).authorized) {
    transition.abort()
  } else {
    transition.next()
    setProgress(60)
  }
})

router.afterEach(transition => {
  window.scrollTo(0, 0)
  setProgress(100)
})

router.start(App, 'app')
