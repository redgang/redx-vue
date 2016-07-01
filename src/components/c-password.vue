<template>
  <div :class="['c-password', class, {'show-password': showPassword}]">
    <c-icon class="c-password-toggle icon-check" @click="_toggle"></c-icon>
    <input class="c-password-input"
      :type="showPassword ? 'text' : 'password'"
      :field="field"
      v-model="value"
      v-bind="attrs"
      @change="_validate"
      debounce="500">
  </div>
</template>

<script>
import mField from './m-field'
import CIcon from './c-icon'
export default {
  mixins: [mField],

  data () {
    return {
      showPassword: false
    }
  },

  methods: {
    _toggle () {
      this.showPassword = !this.showPassword
    }
  },

  components: {
    CIcon
  }
}
</script>

<style src="styles/components/password"></style>
