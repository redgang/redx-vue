<template>
  <div :class="['c-datetime', class]">
    <span class="c-datetime-input"
      @click="showPicker = !showPicker">{{value | datetime attrs.format}}</span>
    <input type="hidden"
      :field="field"
      v-model="value"
      v-bind="attrs"
      number>
    <c-datepicker v-if="showPicker"
      :value.sync="value"
      :format="attrs.format"
      :show.sync="showPicker"></c-datepicker>
  </div>
</template>

<script>
import datetime from 'nd-datetime'
import mField from './m-field'
import CDatepicker from './c-datepicker'
export default {
  mixins: [mField],

  data () {
    return {
      showPicker: false
    }
  },

  filters: {
    datetime
  },

  components: {
    CDatepicker
  }
}
</script>

<style src="styles/components/datetime"></style>
