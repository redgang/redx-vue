<template>
  <div class="c-group-cell" @click="_click(model.click)">
    <c-icon class="c-group-cell-icon"
      :value="model.icon" v-if="model.icon"></c-icon>
    <c-label class="c-group-cell-label">{{model.label}}</c-label>
    <div :class="['c-group-cell-value', {link: model.extra && model.extra.isLink}]">
      <template v-if="model.extra && model.extra.isHTML">
        {{{model.value}}}
      </template>
      <template v-else>
        {{model.value}}
      </template>
    </div>
  </div>
</template>

<script>
import CIcon from './c-icon'
import CLabel from './c-label'
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    model: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  methods: {
    _click (callback) {
      if (typeof callback === 'function') {
        callback()
      }
    }
  },

  components: {
    CIcon,
    CLabel
  }
}
</script>

<style src="styles/components/group-cell"></style>
