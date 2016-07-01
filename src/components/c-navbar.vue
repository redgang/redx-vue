<template>
  <div :class="['c-navbar', class]">
    <c-mask v-show="opened"
      @touchend.prevent="opened = false"
      transition="fade"></c-mask>
    <button :class="['c-navbar-toggle', {active: opened}]"
      type="button"
      @click="opened = !opened">
        <c-icon class='icon-menu'></c-icon>
    </button>
    <nav class="c-navbar-menu"
      v-show="opened"
      @click="opened = false"
      transition="fade">
      <slot></slot>
    </nav>
  </div>
</template>

<script>
import CMask from './c-mask'
import CIcon from './c-icon'
export default {
  props: {
    class: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      opened: false
    }
  },

  components: {
    CMask,
    CIcon
  }
}
</script>

<style src="styles/components/navbar"></style>
