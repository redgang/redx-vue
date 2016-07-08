<!-- Inspired by https://facebook.github.io/react-native/docs/picker.html -->
<template>
  <div :class="['c-picker-column', class]"
    @touchstart.prevent="_dragstart($event)"
    @touchmove.prevent="_drag($event)"
    @touchend.prevent="_dragend($event)">
    <div class="c-picker-column-scroller"></div>
    <div class="c-picker-column-content"
      :style="{transform: transform}">
      <span v-for="(index, item) in items" track-by="index">{{item.label}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 7,
      validator (value) {
        return value >= 3 && value % 2 === 1
      }
    },
    value: {
    },
    items: {
      type: Array,
      default () {
        return []
      },
      coerce (val) {
        if (!val[0] || !val[0].label) {
          return val.map(value => {
            return {
              label: value,
              value
            }
          })
        }
        return val
      }
    },
    itemHeight: {
      type: Number,
      default: 32
    }
  },

  computed: {
    // between minOffset and maxOffset
    offset () {
      let index = this.items.map(item => item.value).indexOf(this.value)
      if (index === -1) {
        this.value = this.items[0].value
        index = 0
      }
      return this.maxOffset - index
    },
    maxOffset () {
      return (this.size - 1) / 2
    },
    minOffset () {
      return (this.size + 1) / 2 - this.items.length
    },
    transform () {
      return 'translate3d(0px, ' + this.offset * this.itemHeight + 'px, 0px)'
    }
  },

  methods: {
    _dragstart (e) {
      if (e.touches && e.touches.length) {
        this.dragging = true
        this.startY = e.touches[0].pageY
        this.startOffset = this.offset
        this._offset = this.startOffset
      }
    },
    _drag (e) {
      if (this.dragging) {
        const distance = e.touches[0].pageY - this.startY
        let offset = this.startOffset + Math.floor(distance / this.itemHeight)
        offset = Math.min(this.maxOffset, Math.max(this.minOffset, offset))
        if (this._offset !== offset) {
          this._offset = offset
          this.value = this.items[this.maxOffset - offset].value
        }
      }
    },
    _dragend (e) {
      this.dragging = false
      // this.$emit('mutate', this.value)
    }
  },

  watch: {
    value (val) {
      this.$nextTick(() => {
        this.$emit('mutate', val)
      })
    }
  }
}
</script>

<style src="styles/components/picker"></style>