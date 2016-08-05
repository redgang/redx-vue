<template>
  <div class="container">
    <c-progress class="progress" :progress="progress"></c-progress>
    <c-toast class="toast" :toasts="toasts"></c-toast>
    <v-header :routes="routes"></v-header>
    <div class="content">
      <router-view class="router-view" transition="slide-up" transition-mode="out-in" keep-alive></router-view>
      <c-pane class='img-pos' @click="close" v-if="flag">
        <c-image :src="imageUrl" alt="本地调试" :title='imageUrl'></c-image>
      </c-pane>
    </div>
    <!--<v-footer v-if="$route.path === '/'"></v-footer>-->
  </div>
</template>

<script>
import { CProgress, CToast, CImage, CPane } from 'components'
import VHeader from 'views/common/v-header'
import VFooter from 'views/common/v-footer'
import store from 'store'
import { mapGetters, mapActions } from 'vuex'
import { routes } from 'routes'

export default {
  name: 'App',
  store,
  data(){
     return {
       flag : __DEV__,
       cUrl : ''
     }
  },

  computed: {
    ...mapGetters(['lang', 'i18n', 'progress', 'toasts']),
    routes () {
      return navRoutes.call(this, routes, (key, route) => {
        return key !== '/' && route.auth !== !this.authorized
      })
    },
    imageUrl(){
       //return 'http://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+encodeURIComponent(this.cUrl)
       return 'http://pan.baidu.com/share/qrcode?w=150&h=150&url='+encodeURIComponent(this.cUrl)
    }
  },

  watch: {
     '$route.path': {
         handler(val,old){
           this.cUrl = location.href;
         },
         immediate: true
     }
  },

  methods: {
    ...mapActions(['setEnv']),
    close(){
      this.flag = false;
    }
  },

  created () {
    // for get i18n in first
    if (!this.i18n) {
      this.setEnv({
        lang: this.lang
      })
    }
  },

  components: {
    CImage, 
    CPane,
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