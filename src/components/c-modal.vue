<template>
  <div :class="['c-modal', class]"
    v-show="show"
    transition="fade">
    <c-mask v-if="backdrop" v-show="show"
      @touchend.prevent="show = false"
      transition="fade"></c-mask>
    <div class="c-modal-content"
      v-show="show"
      transition="slide-up">
      <div class="c-modal-body"><slot></slot></div>
      <c-pane class="c-modal-footer"
        v-if="_actions">
        <c-cell direction="row">
          <c-flex v-for="action in _actions">
            <c-button :class="action.class"
              :type="action.type"
              @click="_click($key)">{{action.label}}</c-button>
          </c-flex>
        </c-cell>
      </c-pane>
    </div>
  </div>
</template>

<script>
import CPane from './c-pane'
import CMask from './c-mask'
import CCell from './c-cell'
import CFlex from './c-flex'
import CButton from './c-button'
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    show: {
      twoWay: true,
      type: Boolean,
      default: false
    },
    backdrop: {
      type: Boolean,
      default: true
    },
    actions: {
      type: Object,
      default () {
        return {
          submit: {
            label: '确定',
            class: 'warning',
            type: 'submit'
          },
          cancel: {
            label: '取消',
            class: 'default',
            type: 'button'
          }
        }
      }
    },
    callback: {
      type: Function,
      default: () => Promise.resolve(true)
    }
  },

  computed: {
    _actions () {
      if (!this.actions || Object.keys(this.actions).length === 0) {
        return null
      }
      return this.actions
    }
  },

  methods: {
    _click (key) {
      promisify(this.callback(key))
        .then(() => { this.show = false }, () => { this.show = true })
    }
  },

  components: {
    CMask,
    CPane,
    CCell,
    CFlex,
    CButton
  }
}

function promisify (val) {
  if (!val) {
    return val === false ? Promise.reject(val) : Promise.resolve(val)
  }

  if (typeof val.then === 'function') {
    return val
  }

  return Promise.resolve(val)
}
</script>

<style src="styles/components/modal"></style>
