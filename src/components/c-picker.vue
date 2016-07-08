<!-- Inspired by https://facebook.github.io/react-native/docs/picker.html -->
<template>
  <div :class="['c-picker', class]">
    <span class="c-picker-input"
      @click="show = !show">{{value.join(extra.sep)}}</span>
    <input type="hidden"
      :field="field"
      v-model="value"
      v-bind="attrs"
      number>
    <div class="c-picker-popup"
      v-focus="show"
      v-show="show"
      tabindex="-1"
      transition="fade">
      <c-mask class="c-picker-popup-mask"
        @touchend.prevent="show = false"></c-mask>
      <div class="c-picker-popup-body"
        @touchmove.prevent>
        <div class="c-picker-popup-header">
        </div>
        <div class="c-picker-popup-content">
          <c-picker-column v-for="(index, items) in extra.data"
            track-by="index"
            :value="value[index]"
            :items="items"
            @mutate="mutate(index, $arguments)"
            ></c-picker-column>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mField from './m-field'
import CMask from './c-mask'
import CPickerColumn from './c-picker-column'
export default {
  mixins: [mField],

  props: {
    value: {
      twoWay: true,
      type: Array,
      default () {
        return []
      }
    },
    show: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    mutate (index, [val]) {
      const value = [...this.value]
      value[index] = val
      this.value = value
    }
  },

  components: {
    CMask,
    CPickerColumn
  },

  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    focus (val) {
      if (val) {
        this.vm.$nextTick(function () {
          this.$el.focus()
        })
      }
    }
  }
}
</script>

<style src="styles/components/picker"></style>