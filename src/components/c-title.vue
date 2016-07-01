<template>
  <div :class="['c-title', class]"><slot></slot></div>
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

<style src="styles/components/title"></style>
