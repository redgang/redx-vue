<template>
  <div :class="['c-mask', class]"
    tabindex="-1"
    transition="fade"><slot></slot></div>
</template>

<script>
export default {
  props: {
    class: {
      type: String,
      default: ''
    }
  }
}
</script>

<style src="styles/components/mask"></style>
