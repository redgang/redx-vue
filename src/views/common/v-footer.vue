<template>
  <footer :class="['c-footer', class]">
    <c-route :routes="routes"></c-route>
  </footer>
</template>

<script>
    import { CRoute } from 'components'

    export default {
      props: {
        class: {
          type: String,
          default: 'default'
        },
        routes: {
          type: Array,
          default () {
            return []
          }
        }
      },
      computed: {
        routes () {
          const route = getFooter()
          route.forEach(val => {
            val.title = this.__(val.title)
          })
          return route
        }
      },
      components: {
        CRoute
      }
    }

    const getFooter = () => {
      return [{
        // icon: 'login',
        title: 'footer.index',
        name: 'home'
      }, {
        // icon: 'login',
        title: 'footer.community',
        name: 'demo'
      }, {
        // icon: 'login',
        title: 'footer.cart',
        name: 'docs'
      }, {
        // icon: 'login',
        title: 'footer.user',
        name: 'login'
      }]
    }
</script>

<style src='styles/views/footer'></style>