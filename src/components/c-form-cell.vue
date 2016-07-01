<template>
  <div :class="['c-form-cell', class]">
    <c-icon class="c-form-cell-icon">{{model.icon}}</c-icon>
    <c-label class="c-form-cell-label">{{model.label}}</c-label>
    <component class="c-form-cell-value"
      align="right"
      :is="model.type"
      :field="field"
      :value.sync="value"
      :attrs="model.attrs"
      :extra="model.extra"
      :validate="model.validate"></component>
  </div>
</template>

<script>
import CIcon from './c-icon'
import CLabel from './c-label'
import Textfield from './c-textfield'
import Multiline from './c-multiline'
import Password from './c-password'
import Checkbox from './c-checkbox'
import Datetime from './c-datetime'
import CSelect from './c-select'
import Picker from './c-picker'

export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    field: {
      type: String,
      default: ''
    },
    model: {
      type: Object,
      default () {
        return {}
      }
    },
    value: {
    }
  },

  watch: {
    value (val) {
      this.$nextTick(() => {
        this.$emit('mutate', val)
      })
    }
  },

  components: {
    CIcon,
    CLabel,
    Textfield,
    Multiline,
    Password,
    Checkbox,
    Datetime,
    CSelect,
    Picker
  }
}
</script>

<style src="styles/components/form-cell"></style>
