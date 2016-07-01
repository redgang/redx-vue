<template>
  <i :class="['c-icon', class, value? `icon-${value}` :'']"></i>
</template>

<script>
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  }
}
</script>

<style src="styles/components/icon"></style>
