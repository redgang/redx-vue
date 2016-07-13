<template>
    <div class="c-swipe-item">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: 'c-swipe-item',

    ready () {
      this.$dispatch('swipeItemCreated', this)
    },

    detached () {
      this.$dispatch('swipeItemDestroyed', this)
    },

    destroyed () {
      this.$dispatch('swipeItemDestroyed', this)
    }
  }
</script>