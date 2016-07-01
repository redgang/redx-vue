<template>
  <button :class="['c-button', class]"
    :type="type"
    v-bind="attrs"><slot></slot></button>
</template>

<script>
export default {
  props: {
    class: {
      type: String,
      default: 'default'
    },
    type: {
      type: String,
      default: 'button'
    },
    attrs: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style src="styles/components/button"></style>
