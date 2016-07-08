<template>
  <div :class="['c-form', class]">
    <form @submit.prevent="submit"
      autocomplete="off"
      novalidate>
      <slot name="header"></slot>
      <c-title class="c-form-title"
        v-if="title">{{title}}</c-title>
      <div class="c-form-cells"
        v-if="items">
        <c-form-cell
          v-for="(key, cell) in cells"
          :field="key"
          :model="cell"
          :value="items[key]"
          @mutate="_mutate(key, $arguments)"></c-form-cell>
      </div>
      <slot name="footer"></slot>
    </form>
  </div>
</template>

<script>
import CTitle from './c-title'
import CFormCell from './c-form-cell'
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    submit: {
      type: Function,
      default: () => true
    },
    cells: {
      type: Object,
      default () {
        return {}
      }
    },
    items: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  methods: {
    _mutate (key, [val]) {
      if (!this.payload) {
        this.payload = { ...this.items }
      }
      this.payload[key] = val
      this.$emit('mutate', this.payload)
    }
  },

  components: {
    CTitle,
    CFormCell
  }
}
</script>

<style src="styles/components/form"></style>