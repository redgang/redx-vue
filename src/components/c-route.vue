<template>
  <div class="c-route">
    <ul>
      <li v-for="route in routes">
        <c-route-link :route="{
            link: {
              path: father + route.path,
              name: route.name,
              exact: route.exact
            },
            icon: route.icon,
            title: route.title
          }"></c-route-link>
        <template v-if="route.subRoutes">
          <c-route
            :father="route.path"
            :routes="route.subRoutes"></c-route>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import CRouteLink from 'components/c-route-link'
export default {
  name: 'c-route',
  props: {
    father: {
      type: String,
      default: ''
    },
    routes: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    CRouteLink
  }
}
</script>
