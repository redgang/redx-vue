<template>
  <div :class="['c-datepicker', class]"
    v-focus="show"
    v-show="show"
    tabindex="-1"
    transition="fade">
    <c-mask class="c-datepicker-mask"
      @touchend.prevent="show = false"></c-mask>
    <div class="c-datepicker-body"
      @touchmove.prevent>
      <div class="c-datepicker-header">
        <template v-for="(index, column) in columns" track-by="index">
          <b v-if="column.type === 'picker'">{{zeroPad(column.value)}}</b>
          <i v-else>{{column}}</i>
        </template>
      </div>
      <div class="c-datepicker-content">
        <template v-for="(index, column) in columns" track-by="index">
          <c-picker-column v-if="column.type === 'picker'"
            :class="column.class"
            :size="size"
            :value="column.value"
            :items="column.items"
            @mutate="column.mutate"></c-picker-column>
          <i v-else>{{column}}</i>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import datetime from 'nd-datetime'
import CMask from './c-mask'
import CPickerColumn from './c-picker-column'
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: 0
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd hh:mm:ss'
    }
  },

  data () {
    const moment = datetime(this.value)
    return {
      size: 7,
      /* eslint-disable */
      year: moment.yyyy(),
      month: moment.M(),
      date: moment.d(),
      hour: moment.h(),
      minute: moment.m(),
      second: moment.s(),
      /* eslint-enable */
    }
  },

  computed: {
    columns () {
      const views = this.format.match(/y+|M+|d+|h+|m+|s+|i+|E+|D+|[^yMdhmsiED]+/g)
      if (views === null) {
        return []
      }
      // views.unshift(' ')
      // views.push(' ')
      return views.map(view => {
        if (/[^yMdhmsiED]/.test(view)) {
          return view
        }
        const name = this.getName(view)
        return {
          class: `c-datepicker-${name}s`,
          type: 'picker',
          value: this[name],
          items: this.getItems(view),
          mutate (val) {
            this[name] = val
          }
        }
      })
    }
  },

  watch: {
    year: watch,
    month: watch,
    date: watch,
    hour: watch,
    minute: watch,
    second: watch
  },

  methods: {
    zeroPad,
    getName (type) {
      return ({
        'yyyy': 'year',
        'MM': 'month',
        'dd': 'date',
        'hh': 'hour',
        'mm': 'minute',
        'ss': 'second'
      })[type]
    },
    getItems (type) {
      switch (type) {
        case 'yyyy':
          return makeArrayByRange(1900, 2020)
        case 'MM':
          return makeArrayByRange(1, 12)
        case 'dd':
          return makeArrayByRange(1, datetime(`${this.year}-${this.month + 1}-00`, 'yyyy-MM-dd').d())
        case 'hh':
          return makeArrayByRange(0, 23)
        case 'mm':
        case 'ss':
          return makeArrayByRange(0, 59)
      }
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

function watch () {
  this.$nextTick(() => {
    this.value = datetime(`${this.year}-${this.month}-${this.date} ${this.hour}:${this.minute}:${this.second}`).toNumber()
  })
}

function zeroPad (value) {
  if (value < 10) {
    return '0' + value
  }
  return '' + value
}

function makeArrayByRange (start, end) {
  const arr = []
  for (let i = start; i <= end; i++) {
    arr.push({
      label: zeroPad(i),
      value: i
    })
  }
  return arr
}
</script>

<style src="styles/components/datepicker"></style>