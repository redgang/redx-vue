<template>
  <div :class="['c-cell', class, direction]"><slot></slot></div>
</template>

<script>
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    direction: {
      type: String,
      default: ''
    }
  }
}
</script>

<style src="styles/components/cell"></style>
