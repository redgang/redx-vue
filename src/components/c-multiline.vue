<template>
  <div :class="['c-multiline', class]">
    <textarea class="c-multiline-textarea"
      :field="field"
      :validate="validate"
      v-model="value"
      v-bind="attrs"
      debounce="500"></textarea>
  </div>
</template>

<script>
import mField from './m-field'
export default {
  mixins: [mField]
}
</script>

<style src="styles/components/multiline"></style>
