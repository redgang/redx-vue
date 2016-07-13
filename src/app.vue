<template>
  <div class="container">
    <c-progress class="progress"
      :progress="progress"></c-progress>
    <c-toast class="toast"
      :toasts="toasts"></c-toast>
    <v-header :routes="routes"></v-header>
    <div class="content">
      <router-view class="router-view"
        transition="slide-up"
        transition-mode="out-in"
        keep-alive></router-view>
    </div>
    <!--<v-footer v-if="$route.path === '/'"></v-footer>-->
  </div>
</template>

<script>
import { CProgress, CToast } from 'components'

import VHeader from 'views/common/v-header'
import VFooter from 'views/common/v-footer'
import store from 'vx/store'
import { toasts } from 'vx/getters'
import { setEnv } from 'vx/actions'
import { routes } from 'routes'

export default {
  name: 'App',
  store,
  computed: {
    routes () {
      return navRoutes.call(this, routes, (key, route) => {
        return key !== '/' && route.auth !== !this.env.authorized
      })
    }
  },
  created () {
    // for get i18n in first
    this.setEnv(this.env)
  },

  vuex: {
    getters: {
      toasts
    },
    actions: {
      setEnv
    }
  },

  components: {
    CProgress,
    CToast,
    VHeader,
    VFooter
  }
}
/**
 * nav routes
 */
function navRoutes (routes, filter) {
  if (!routes) {
    return []
  }

  return Object.keys(routes)
  .filter(key => !routes[key].hidden)
  .filter(key => filter(key, routes[key]))
  .map(key => {
    const route = routes[key]
    return {
      path: route.path || key,
      name: route.name,
      exact: route.exact,
      icon: route.icon,
      title: this.__(route.title)
      // ,subRoutes: walkRoutes.call(this, route.subRoutes, filter)
    }
  })
}
</script>

<style src="styles/app"></style>
