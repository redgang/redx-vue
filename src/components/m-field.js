export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    align: {
      type: String,
      default: ''
    },
    value: {
      twoWay: true
    },
    field: {
      type: String,
      default: ''
    },
    attrs: {
      type: Object,
      default () {
        return {}
      }
    },
    extra: {
      type: Object,
      default () {
        return {}
      }
    },
    validate: null
  },

  methods: {
    _validate () {
      if (!this.validate || !this.$validation) {
        return
      }
      this.$validate()
    }
  }
}
