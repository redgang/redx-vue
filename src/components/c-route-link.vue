<template>
  <a class="c-route-link" v-link="route.link">
    <c-icon v-if="route.icon"
      :value="route.icon"></c-icon>
    {{route.title}}</a>
</template>

<script>
import CIcon from 'components/c-icon'
export default {
  props: {
    route: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  components: {
    CIcon
  }
}
</script>
