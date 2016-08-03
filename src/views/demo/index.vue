<template>
  <div>
    <c-pane v-if="$route.path === '/demo'">
      <c-group v-for="demo in demos" :title="__(demo.title)" :cells="demo.cells" :items="demo.items"></c-group>
    </c-pane>
    <router-view class="router-view" transition="slide-up" keep-alive></router-view>
  </div>
</template>

<script>
  import { CPane, CGroup, CTitle } from 'components'

  export default {
    computed: {
      demos () {
        const { router } = this.$route
        return [{
          title: 'view.home.example',
          cells: [{
            label: 'form',
            value: this.__('demo.form'),
            click () {
              router.go('/demo/form')
            },
            extra: {
              isLink: true
            }
          }, {
            label: 'swipe',
            value: this.__('demo.swipe'),
            click () {
              router.go('/demo/swipe')
            },
            extra: {
              isLink: true
            }
          }, {
            label: 'iscroll',
            value: this.__('demo.iscroll'),
            click () {
              router.go('/demo/iscroll')
            },
            extra: {
              isLink: true
            }
          }]
        }]
      }
    },
    components: {
      CPane,
      CGroup,
      CTitle
    }
}
</script>