<template>
  <div :class="['c-validation', class]">
    <ul class="c-validation-errors"
      v-if="validation.errors">
      <li class="c-validation-error"
        v-for="error in validation.errors">
        {{error.message}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    validation: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style src="styles/components/validation"></style>
