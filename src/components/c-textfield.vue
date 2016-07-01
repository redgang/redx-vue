<template>
  <div :class="['c-textfield', class]">
    <input class="c-textfield-input"
      :type="type"
      :field="field"
      v-model="value"
      v-bind="attrs"
      @change="_validate"
      debounce="500">
  </div>
</template>

<script>
import mField from './m-field'
export default {
  mixins: [mField],

  props: {
    type: {
      type: String,
      default: 'text'
    }
  }
}
</script>

<style src="styles/components/textfield"></style>
