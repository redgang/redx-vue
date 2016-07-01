<template>
  <div :class="['c-progress', class]"
    :style="{width: '' + progress + '%'}"></div>
</template>

<script>
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    progress: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style src="styles/components/progress"></style>
