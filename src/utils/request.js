//https://github.com/github/fetch
import 'whatwg-fetch'
import Promise from 'nd-promise'
import qs from 'querystring'
import isPlainObj from 'is-plain-obj'

const proxyUrl = __DEV__ ? '/api/' : ''

const defaultOptions = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'GET',
  proxyFlag : true
}

/**
 * request
 * @param  {String|Object} options   Options
 * @return {Promise}                 Promise
 */

export default function request(...args) {
  if (args.length === 0) {
    console.warn('URL or Options is Required!')
    return
  }

  if (typeof args[0] === 'string') {
    if (args[1] === undefined) {
      args[1] = {}
    } else if (!isPlainObj(args[1])) {
      console.warn('Options MUST be Object!')
      return
    }
    args[1].url = args[0]
    args[0] = args[1]
  }

  if (!isPlainObj(args[0])) {
    console.warn('Options MUST be Object!')
    return
  }
  return new Promise((resolve, reject) => {
    parseOptions(merge({}, defaultOptions, args[0]))
      .then(({ url, ...options }) => fetch(url, options))
      .then(res => {
        if (res && res.status >= 200 && res.status < 400) {
          getResult(res).then(resolve, reject)
        } else {
          getResult(res).then(reject)
        }
      })
      .catch(reject)
  })
}

function merge(src, ...args) {
  args.forEach(arg => {
    Object.keys(arg).forEach(key => {
      if (isPlainObj(arg[key])) {
        if (!src.hasOwnProperty(key)) {
          src[key] = {}
        }
        Object.assign(src[key], arg[key])
      } else {
        src[key] = arg[key]
      }
    })
  })
  return src
}

function getResult(res) {
  const type = res.headers.get('Content-Type')
  return (type && type.indexOf('json') !== -1) ? res.json() : res.text()
}

function parseOptions({ url = '', query, params, rKey, mutate, ...options }) {
  if (params) {
    if (typeof params === 'object') {
      if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
        params = JSON.stringify(params)
      } else {
        url += ((url.indexOf('?') !== -1) ? '&' : '?') + qs.stringify(params)
        params = null
      }
    }
    if (params) {
      options.body = params
    }
  }

  if (query) {
    if (typeof query === 'object') {
      query = qs.stringify(query)
    }
    url += ((url.indexOf('?') !== -1) ? '&' : '?') + query
  }

  // 替换地址中的宏变量：{xyz}
  if (rKey) {
    url = replaceUrlWithParams(url, rKey)
  }

  options.url = !options.proxyFlag ? url : proxyUrl + url

  // mutate must be a function and return a promise
  // useful for add authorization
  if (mutate) {
    return mutate(options)
  }
  //删除proxyFlag
  delete options.proxyFlag
  return Promise.resolve(options)
}

function replaceUrlWithParams(url, params) {
  // from: https://github.com/Matt-Esch/string-template
  return url.replace(/\{(\w+)\}/g, function (match, key, index) {
    let result

    // {{x}} -> {x}
    if (url.charAt(index - 1) === '{' &&
      url.charAt(index + match.length) === '}') {
      return key
    } else {
      // {x} -> *
      result = params.hasOwnProperty(key) ? params[key] : null
      if (result === null || result === undefined) {
        return ''
      }

      return result
    }
  })
}