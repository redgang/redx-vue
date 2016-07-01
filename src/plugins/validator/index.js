import Promise from 'nd-promise'
import * as rules from './rules'

export default function plugin (Vue) {
  if (plugin.installed) {
    return
  }

  if (Vue.config.debug) {
    console.log('[Validator] Vue Validator Plugin Installed.')
  }

  const _init = Vue.prototype._init
  Vue.prototype._init = function (options = {}) {
    options.init = options.init
      ? [validatorInit].concat(options.init)
      : validatorInit
    _init.call(this, options)
  }

  function validatorInit () {
    const { validator } = this.$options

    if (validator) {
      this.$validator = this
      // 在入口处定义 $validation
      Vue.util.defineReactive(this, '$validation', {
        fields: [],
        errors: [],
        valid: true,
        invalid: false
      })
      handleNextTick(this, validator.auto)
    } else {
      // 寻找父级带 validator 的组件
      const validatorVm = getValidatorVm(this)
      if (validatorVm) {
        // set references
        this.$validator = validatorVm
        this.$validation = validatorVm.$validation
        handleNextTick(this, validatorVm.$options.validator.auto)
      }
    }
  }

  /**
   * $validate
   *
   * validate vm recursively.
   *
   * @return {Promise}
   */
  Vue.prototype.$validate = function () {
    const validate = this.validate
    const $validator = this.$validator
    const $validation = this.$validation

    if (validate) { // 带有校验配置
      // 重设当前 field 对应的错误信息
      const errors = $validation.errors.filter(error => {
        return error.field !== this.field
      })
      // 校验当前 field
      Object.keys(validate).some(key => {
        if (rules[key]) {
          const { rule, message } = validate[key]
          if (!rules[key](this.value, rule)) {
            errors.push({
              field: this.field,
              rule,
              message
            })
            return true
          }
        }
        return false
      })
      // 更新 $validation
      $validation.errors = errors
      $validation.valid = errors.length === 0
      $validation.invalid = errors.length > 0
    } else if ($validator === this) {
      // 顶级往下校验所有子组件
      $validation.fields.forEach(field => field.$validate())
    }

    return new Promise((resolve, reject) => {
      $validation.valid ? resolve($validation) : reject($validation)
    })
  }
}

/**
 * Get the ancestor vm that own validator
 * @param  {Vue} vm vm
 * @return {Vue}    vm
 */
function getValidatorVm (vm) {
  while ((vm = vm.$parent)) {
    if (vm.$options.validator) {
      return vm
    }
  }
}

function handleNextTick (vm, auto) {
  vm.$nextTick(function () {
    // 定义了校验规则
    if (vm.validate) {
      vm.$validation.fields.push(vm)
      // 加载完成自动检查
      if (auto) {
        vm.$validate()
      }
    }
  })
}
