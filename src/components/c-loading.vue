<template>
  <div :class="['c-loading', class]"><div :class="['c-loading-' + theme]"></div><slot></slot></div>
</template>

<script>
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'snake'
    }
  }
}
</script>

<style src="styles/components/loading"></style>
