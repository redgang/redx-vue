<template>
  <div class="demos">
    <c-pane class="demos">
      <c-form
        v-for="demo in demos"
        :title="demo.title"
        :cells="demo.cells"
        :items="demo.items"
        @mutate="mutate"></c-form>
    </c-pane>
  </div>
</template>

<script>
import { CPane, CForm } from 'components'

export default {
  data () {
    return {
      demos: [{
        title: 'Text',
        cells: {
          regular: {
            label: '默认',
            type: 'textfield'
          }
        },
        items: {
          regular: '我是textfield'
        }
      }, {
        title: 'Password',
        cells: {
          regular: {
            label: '默认',
            type: 'password'
          }
        },
        items: {
          regular: '我是password'
        }
      }, {
        title: 'Select',
        cells: {
          regular: {
            label: '默认',
            type: 'CSelect',
            extra: {
              options: [{
                label: '深圳',
                value: 'shenzhen'
              }, {
                label: '武汉',
                value: 'wuhan'
              }]
            }
          }
        },
        items: {
          regular: 2
        }
      }, {
        title: 'Checkbox',
        cells: {
          regular: {
            label: '默认',
            type: 'checkbox'
          },
          customLabel: {
            label: '自定义 label',
            type: 'checkbox',
            extra: {
              'true-label': '正常',
              'false-label': '禁用'
            }
          },
          customValue: {
            label: '自定义 Value',
            type: 'checkbox',
            extra: {
              'true-value': '是',
              'false-value': '否'
            }
          }
        },
        items: {
          regular: false,
          customLabel: true,
          customValue: '否'
        }
      }, {
        title: 'Datetime',
        cells: {
          regular: {
            label: '默认',
            type: 'datetime'
          },
          custom: {
            label: '自定义',
            type: 'datetime',
            attrs: {
              format: 'yyyy-MM-dd'
            }
          },
          custom2: {
            label: '自定义',
            type: 'datetime',
            attrs: {
              format: 'yyyy年MM月dd日'
            }
          }
        },
        items: {
          regular: Date.now(),
          custom: Date.now(),
          custom2: Date.now()
        }
      }]
    }
  },

  methods: {
    mutate () {
      console.log.apply(console, arguments)
    }
  },

  components: {
    CPane,
    CForm
  }
}
</script>
