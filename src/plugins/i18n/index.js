import format from 'string-template'

export default function plugin (Vue, globalOptions = {}) {
  if (plugin.installed) {
    return
  }

  if (Vue.config.debug) {
    console.log('[I18n] Vue I18n Plugin Installed.')
  }

  const _init = Vue.prototype._init
  Vue.prototype._init = function (options = {}) {
    options.init = options.init
      ? [i18nInit].concat(options.init)
      : i18nInit
    _init.call(this, options)
  }

  function i18nInit () {
    const { i18n } = this.$options

    if (i18n) {
      // 在入口处定义 $i18n
      Vue.util.defineReactive(this, '$i18n', { ...globalOptions, ...i18n })
    } else {
      // 寻找父级带 i18n 的组件
      const i18nVm = getI18nVm(this)
      if (i18nVm) {
        // set references
        this.$i18n = i18nVm.$i18n
      } else {
        Vue.util.defineReactive(this, '$i18n', { ...globalOptions })
      }
    }
  }

  /**
   * 翻译字符串
   *
   * Example:
   * ```
   * {
   *   foo: { bar: 'baz' },
   *   v: { a: '1{r}2' },
   *   x: { a: '3{0}4' }
   * }
   * __('foo.bar') -> 'baz'
   * __('v.a', { r: 'hello' }) -> '1hello2'
   * __('x.a', ['world']) -> '3world4'
   * ```
   *
   * @method $translate
   * @alias  __
   * @param  {String}         keys    待翻译 Key
   * @param  {Array|Object}   [args]  模板变量
   * @return {String}                 翻译结果
   */
  Vue.prototype.__ = Vue.prototype.$translate = function (keys, ...args) {
    if (!keys || !this.$i18n || typeof this.$i18n.data !== 'function') {
      return keys
    }
    // `.` 作为分隔符
    return format(keys.split('.').reduce((res, key) => {
      if (res && res.hasOwnProperty && res.hasOwnProperty(key)) {
        return res[key]
      }
      return keys
    }, this.$i18n.data()), ...args)
  }
}

function getI18nVm (vm) {
  while ((vm = vm.$parent)) {
    if (vm.$options.i18n) {
      return vm
    }
  }
}
